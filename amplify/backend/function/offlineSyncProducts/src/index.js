const AWS = require("aws-sdk");
const mysql = require("mysql2/promise");

const { RDS_PROXY_URL, DATABASE, USERNAME, REGION, PASSWORD } = process.env;

const signer = new AWS.RDS.Signer({
    region: REGION,
    port: 3306,
    username: USERNAME,
    password: PASSWORD,
    hostname: RDS_PROXY_URL,
});

const initConn = () => {
    const connectionConfig = {
        host: RDS_PROXY_URL,
        database: DATABASE,
        user: USERNAME,
        ssl: "Amazon RDS",
        password: PASSWORD,
        authPlugins: {
            mysql_clear_password: () => () => signer.getAuthToken(),
        },
    };
    return mysql.createConnection(connectionConfig);
};

const _runQuery = async (conn, sql, values) => {
    console.log(`execute sql >`);
    console.log(sql.trim().replace(/\s+/g, " "));
    console.log(`with values >`);
    console.log(JSON.stringify(values, null, 2));
    const [result] = await conn.query(sql, values);
    console.log(`result >`);
    console.log(JSON.stringify(result, null, 2));
    return result;
};

const _selectRow = async ({ table, lookupId, connection }) => {
    let sql = `SELECT * FROM ${table} WHERE id = ?`;
    const values = [lookupId];

    // RETRIEVE the row and potential parent
    const [row] = await _runQuery(connection, sql, values);
    return row;
};

const _doUpdateTransactionWithRowLock = async ({
    sql,
    values,
    uuid,
    table,
    connection,
}) => {
    // START TRANSACTION to lock the row
    await connection.query(`START TRANSACTION`);

    // TRY to lock the row for update
    const locksql = `SELECT id FROM ${table} WHERE id=? LOCK IN SHARE MODE;`;
    const [existing] = await _runQuery(connection, locksql, [uuid]);

    // UPDATE the row - op specific
    const result = await _runQuery(connection, sql, values);

    console.log(result);

    const row = await _selectRow({
        table,
        lookupId: existing.id,
        connection,
    });

    // FINALLY COMMIT
    await connection.query("COMMIT;");

    if (result.affectedRows !== 1) {
        // INITIAL operation did not update a row, return unhandled mismatch
        console.error("Error: version mismatch on item");
        return {
            data: row,
            errorMessage: "Conflict",
            errorType: "ConflictUnhandled",
        };
    }

    return { data: row };
};

const _query = async ({
    args: { limit = 1_000, nextToken: inNextToken },
    table,
    connection,
}) => {
    const startedAt = Date.now();
    let values = [];
    let offset = 0;
    if (inNextToken) {
        const tokenInfo = JSON.parse(
            Buffer.from(inNextToken, "base64").toString()
        );
        offset = tokenInfo.offset;
    }
    const sql = `SELECT * FROM ${table}`;

    // FETCH the rows
    const rows = await _runQuery(connection, sql, values);

    // EVALUATE next token
    let nextToken = null;
    if (rows.length >= limit) {
        nextToken = Buffer.from(
            JSON.stringify({ offset: offset + rows.length })
        ).toString("base64");
    }
    const items = rows;

    return { data: { items, startedAt, nextToken } };
};

const _get = async ({ args: { id }, table, connection }) => {
    const sql = `SELECT * FROM ${table} WHERE id = ?`;
    const values = [id];

    const rows = await _runQuery(connection, sql, values);
    let data = rows[0];

    return data;
};

const _create = async ({ args: { input }, table, connection }) => {
    const item = { ...input };

    const keys = Object.keys(item);

    let sql = `INSERT INTO ${table} (${keys.join(",")}) VALUES(${keys
        .map((k) => "?")
        .join(",")})`;
    const values = keys.map((k) => item[k]);

    // INSERT the new row
    const result = await _runQuery(connection, sql, values);

    const row = await _selectRow({
        table,
        lookupId: result.insertId,
        connection,
    });

    return { data: row };
};

const _update = async ({ args: { input }, table, connection }) => {
    const { id: uuid, ...item } = input;
    const keys = Object.keys(item);

    const sql = `UPDATE ${table} SET ${keys
        .map((k) => k + " = ?")
        .join(", ")} WHERE id = ?`;
    const values = keys.map((k) => item[k]);
    values.push(uuid);

    return await _doUpdateTransactionWithRowLock({
        sql,
        values,
        uuid,
        table,
        connection,
    });
};

const _delete = async ({ args: { input }, table, connection, belongsTo }) => {
    const { id: uuid } = input;
    const sql = `
  UPDATE ${table} SET isDeleted=true
  WHERE id = ?`;
    const values = [uuid];

    return await _doUpdateTransactionWithRowLock({
        sql,
        values,
        uuid,
        table,
        connection,
        belongsTo,
    });
};

const operations = {
    getProduct: { fn: _get, table: "Products" },
    listProducts: { fn: _query, table: "Products" },
    syncProducts: { fn: _query, table: "Products" },
    createProduct: { fn: _create, table: "Products" },
    updateProduct: { fn: _update, table: "Products" },
    deleteProduct: { fn: _delete, table: "Products" },
};

exports.handler = async (event) => {
    console.log(event);
    try {
        console.log(`passed event >`, JSON.stringify(event, null, 2));
        const { fieldName: operation, arguments: args } = event;

        if (operation in operations) {
            const connection = await initConn();
            const { fn, table } = operations[operation];
            const result = await fn.apply(undefined, [
                { table, args, connection },
            ]);
            await connection.end();
            return result;
        }
    } catch (error) {
        console.log(`Error: unhandled error >`, JSON.stringify(error, null, 2));
        return {
            data: null,
            errorMessage: error.message || JSON.stringify(error),
            errorType: "InternalFailure",
        };
    }
};
