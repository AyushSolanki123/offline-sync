const router = require("express").Router();

const ProductController = require("../controllers/ProductController");

router.get("/", ProductController.listProducts);

router.get("/:productId", ProductController.getProduct);

router.post("/", ProductController.createProduct);

router.put("/", ProductController.updateProduct);

router.delete("/:productId", ProductController.deleteProduct);

module.exports = router;
