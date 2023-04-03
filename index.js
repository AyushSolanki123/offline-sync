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
    aws_cognito_identity_pool_id: process.env.AWS_COGNITO_IDENTITY_POOL_ID,
    aws_cognito_region: process.env.AWS_REGION,
    aws_user_pools_id: process.env.AWS_USER_POOLS_ID,
    aws_user_pools_web_client_id: process.env.AWS_USER_POOLS_WEB_CLIENT_ID,
    oauth: {},
    aws_cognito_username_attributes: [],
    aws_cognito_social_providers: [],
    aws_cognito_signup_attributes: ["EMAIL"],
    aws_cognito_mfa_configuration: "OFF",
    aws_cognito_mfa_types: ["SMS"],
    aws_cognito_password_protection_settings: {
        passwordPolicyMinLength: 8,
        passwordPolicyCharacters: [],
    },
    aws_cognito_verification_mechanisms: ["EMAIL"],
    aws_user_files_s3_bucket: process.env.AWS_USER_FILES_S3_BUCKET,
    aws_user_files_s3_bucket_region: process.env.AWS_REGION,
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
