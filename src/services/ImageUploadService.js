const { Storage } = require("aws-amplify");
const ErrorBody = require("../utils/ErrorBody");
const { logger } = require("../utils/Logger");
const AWS = require("aws-sdk");
const fs = require("fs");

async function uploadImageToS3(file) {
    const fileName = `${Date.now()}_${file.originalname}`;
    const filePath = `Public/${file.originalname}`;

    const imageBuffer = fs.readFileSync(filePath);

    console.log(file.mimetype);

    // Convert the buffer to a base64-encoded string
    const base64String = imageBuffer.toString("base64");

    // Create the data URI string with the base64-encoded image data
    const dataURI = `data:${file.mimetype};base64,${base64String}`;

    console.log(dataURI);

    // const s3 = new AWS.S3({
    //     accessKeyId: process.env.ACCESS_KEY,
    //     secretAccessKey: process.env.SECRET_ACCESS_KEY,
    //     region: process.env.AWS_REGION,
    // });

    // let uploadedImage;
    // try {
    //     uploadedImage = await s3
    //         .upload({
    //             Bucket: process.env.AWS_USER_FILES_S3_BUCKET,
    //             Key: fileName,
    //             Body: fileBuffer,
    //             ContentType: file.mimetype,
    //         })
    //         .promise();
    // } catch (error) {
    //     console.log(error);
    //     throw new ErrorBody(
    //         error.status | 500,
    //         error.message | "Internal server error"
    //     );
    // }

    // console.log(uploadedImage.Location);
    // return uploadedImage.Location;
    return dataURI;
}

module.exports = {
    uploadImageToS3,
};
