const router = require("express").Router();

const ProductController = require("../controllers/ProductController");
const upload = require("../utils/FileUtils");

router.get("/", ProductController.listProducts);

router.get("/:productId", ProductController.getProduct);

router.post("/", upload.single("file"), ProductController.createProduct);

router.put("/", ProductController.updateProduct);

router.delete("/:productId", ProductController.deleteProduct);

module.exports = router;
