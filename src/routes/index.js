const router = require("express").Router();

router.use("/products", require("./ProductRoutes.js"));

router.get("/", (req, res, next) => {
    res.send({ message: "Hello world" });
});

module.exports = router;
