const { logger } = require("../utils/Logger");
const ErrorBody = require("../utils/ErrorBody");
const ProductService = require("../services/ProductService");
const { uploadImageToS3 } = require("../services/ImageUploadService");

async function createProduct(req, res, next) {
    let reqBody = req.body;
    const { file } = req;
    let imageUrl;
    if (file) {
        try {
            imageUrl = await uploadImageToS3(file);
            reqBody = { ...reqBody, ...{ image: imageUrl } };
            const result = await ProductService.addProduct(reqBody);
            res.status(200);
            res.json(result);
        } catch (error) {
            console.log(error);
            logger.error("Failed in Create Product: " + JSON.stringify(error));
            next(
                new ErrorBody(
                    error.status | 500,
                    error.errorMessage | "Internal server Error"
                )
            );
        }
    }
}
async function listProducts(req, res, next) {
    try {
        const result = await ProductService.listProduct();
        res.status(200);
        res.json({
            data: result,
            count: result.length,
        });
    } catch (error) {
        logger.error("Failed in List Product: " + JSON.stringify(error));
        next(
            new ErrorBody(
                error.status | 500,
                error.errorMessage | "Internal server Error"
            )
        );
    }
}
async function getProduct(req, res, next) {
    try {
        const { productId: id } = req.params;
        const result = await ProductService.getProductById(id);
        res.status(200);
        res.json(result);
    } catch (error) {
        logger.error("Failed in Get Product: " + JSON.stringify(error));
        next(
            new ErrorBody(
                error.status | 500,
                error.errorMessage | "Internal server Error"
            )
        );
    }
}
async function updateProduct(req, res, next) {
    try {
        const { id, ...reqBody } = req.body;
        const result = await ProductService.updateProductById(id, reqBody);
        res.status(200);
        res.json(result);
    } catch (error) {
        logger.error("Failed in Update Product: " + JSON.stringify(error));
        next(
            new ErrorBody(
                error.status | 500,
                error.errorMessage | "Internal server Error"
            )
        );
    }
}
async function deleteProduct(req, res, next) {
    try {
        const { productId: id } = req.params;
        const result = await ProductService.deleteProductById(id);
        res.status(200);
        res.json(result);
    } catch (error) {
        logger.error("Failed in Delete Product: " + JSON.stringify(error));
        next(
            new ErrorBody(
                error.status | 500,
                error.errorMessage | "Internal server Error"
            )
        );
    }
}

module.exports = {
    deleteProduct,
    updateProduct,
    createProduct,
    listProducts,
    getProduct,
};
