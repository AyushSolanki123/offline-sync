const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { logger } = require("./src/utils/Logger");
const { Amplify } = require("aws-amplify");

require("dotenv").config();

Amplify.configure({
    aws_project_region: process.env.AWS_REGION,
    aws_appsync_graphqlEndpoint: process.env.AWS_APPSYNC_GRAPHQL_ENDPOINT,
    aws_appsync_region: process.env.AWS_REGION,
    aws_appsync_authenticationType: process.env.AWS_APPSYNC_AUTHENTICATION_TYPE,
    aws_appsync_apiKey: process.env.AWS_APPSYNC_API_KEY,
});

// PORT
const PORT = 3000 || process.env.PORT;
const routes = require("./src/routes");

const app = express();

app.use(cors());
app.use(bodyParser());

app.use("/", routes);

// global error handler
app.use("/", (err, req, res, next) => {
    logger.error("Error occurred");
    logger.log(JSON.stringify(err));
    logger.error(err.errorMessage || "Server error occurred");
    res.status(err.statusCode || 500);
    res.json({ errorMessage: err.errorMessage || "Server error occurred" });
});

app.listen(PORT, () => {
    logger.log("Server started at port: " + PORT);
});
