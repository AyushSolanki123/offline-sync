const { API, graphqlOperation } = require("aws-amplify");
const ErrorBody = require("../utils/ErrorBody");
const { logger } = require("../utils/Logger");
const {
    createProduct,
    updateProduct,
    deleteProduct,
} = require("../graphql/mutations");
const { listProducts, getProduct } = require("../graphql/queries");

async function addProduct(reqBody) {
    try {
        const { data } = await API.graphql(
            graphqlOperation(createProduct, { input: reqBody })
        );
        logger.log("DATA: " + JSON.stringify(data));
        console.log(data);
        return data;
    } catch (error) {
        console.log(error);
        throw new ErrorBody(500, error.message);
    }
}

async function listProduct() {
    try {
        const { data } = await API.graphql(graphqlOperation(listProducts));
        logger.log("ProductS: " + JSON.stringify(data));
        return data.listProducts.items.filter((item) => !item.isDeleted);
    } catch (error) {
        throw new ErrorBody(500, error.message);
    }
}

async function getProductById(id) {
    try {
        const { data } = await API.graphql(
            graphqlOperation(getProduct, { id })
        );
        logger.log("Product: " + JSON.stringify(data));
        return data;
    } catch (error) {
        console.log(error);
        throw new ErrorBody(500, error.message);
    }
}

async function updateProductById(id, reqBody) {
    try {
        const { data } = await API.graphql(
            graphqlOperation(updateProduct, { input: { id, ...reqBody } })
        );
        return data;
    } catch (error) {
        throw new ErrorBody(500, error.message);
    }
}

async function deleteProductById(id) {
    try {
        const { data } = await API.graphql(
            graphqlOperation(deleteProduct, { input: { id } })
        );
        console.log(data);
        return data;
    } catch (error) {
        console.log(error);
        throw new ErrorBody(500, error.message);
    }
}

module.exports = {
    deleteProductById,
    updateProductById,
    addProduct,
    listProduct,
    getProductById,
};
