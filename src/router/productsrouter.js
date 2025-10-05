const express = require("express");
const shopRouter = express.Router();
const products = require("../data/products.json");


shopRouter.route("/").get((req, res) => {
  // ส่ง object ให้ EJS (ต้องเป็น { products })
  res.render("shop", { products });
});
shopRouter.route("/:id").get((req, res) => {
  const id = parseInt(req.params.id, 10);
  if (Number.isNaN(id)) return res.status(400).send("Invalid id");
  const product = products.find((p) => p.id === id);
  if (!product) return res.status(404).send("Product not found");
  res.render("product", { product });
});

module.exports = shopRouter;
