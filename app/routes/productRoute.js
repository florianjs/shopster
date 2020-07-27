const express = require("express");
const router = express.Router();
const ProductController = require("../../controllers/ProductController");

router.route("/add").get(ProductController.getAdd).post(ProductController.add);

router.get("/edit", ProductController.editAll);

router.route("/:id").get(ProductController.edit).post(ProductController.update);

router.get("/delete/:id", ProductController.delete);

router.route("/details/:id").get(ProductController.getProduct);

/**
 *  TODO Add route for single product
 */

module.exports = router;
