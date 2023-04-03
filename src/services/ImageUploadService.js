const { Storage } = require("aws-amplify");
const ErrorBody = require("../utils/ErrorBody");
const { logger } = require("../utils/Logger");
const AWS = require("aws-sdk");
const fs = require("fs");

async function uploadImageToS3(file) {
    const fileName = `${Date.now()}_${file.originalname}`;
    const filePath = `Public/${file.originalname}`;

    const fileBuffer = fs.readFileSync(filePath);

    const fileBlob = Buffer.from(fileBuffer, "binary").toString("base64");

    const s3 = new AWS.S3({
        accessKeyId: process.env.ACCESS_KEY,
        secretAccessKey: process.env.SECRET_ACCESS_KEY,
        region: process.env.AWS_REGION,
    });

    let uploadedImage;
    try {
        uploadedImage = await s3
            .upload({
                Bucket: process.env.AWS_USER_FILES_S3_BUCKET,
                Key: fileName,
                Body: fileBuffer,
                ContentType: file.mimetype,
            })
            .promise();
    } catch (error) {
        console.log(error);
        throw new ErrorBody(
            error.status | 500,
            error.message | "Internal server error"
        );
    }

    console.log(uploadedImage.Location);
    return uploadedImage.Location;
}

module.exports = {
    uploadImageToS3,
};
