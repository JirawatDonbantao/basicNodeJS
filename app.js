const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const chalk = require("chalk");
const debug = require("debug")("app");
const morgan = require("morgan");
const path = require("path");
const shopRouter = require("./src/router/productsrouter");

// add: load products data so /product/:id in app.js can use it
const products = require("./src/data/products.json");

app.use(morgan("combined"));
app.use(express.static(path.join(__dirname, "public")));

// set views folder
app.set("views", path.join(__dirname, "src/views"));
app.set("view engine", "ejs");



app.use("/shop", shopRouter);

// new: รองรับ /product/:id เช่น http://localhost:3000/product/1
app.get("/product/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (Number.isNaN(id)) return res.status(400).send("Invalid id");
  const product = products.find((p) => p.id === id);
  if (!product) return res.status(404).send("Product not found");
  res.render("product", { product });
});

app.get("/", (req, res) => {
  res.render("index", {
    username: "Jirawat",
    customers: ["Jirawat", "John", "Jane"],
  });
});

// replace listen callback to print clear message and handle shutdown
app.listen(PORT, () => {
  console.log(`Server running: http://localhost:${PORT}`);
});

// graceful shutdown on Ctrl+C
process.on("SIGINT", () => {
  console.log("Shutting down server (SIGINT)...");
  process.exit();
});
