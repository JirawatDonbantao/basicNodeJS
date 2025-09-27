const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const chalk = require("chalk");
const debug = require("debug")("app");
const morgan = require("morgan");
const path = require("path");
const shopRouter = express.Router();

app.use(morgan("combined"));
app.use(express.static(path.join(__dirname, "public")));

// set views folder
app.set("views", path.join(__dirname, "src/views"));
app.set("view engine", "ejs");

shopRouter.route("/").get((req, res) => {
  // sample products — replace with DB call in real app
  const products = [
    { id: 1, name: "เสื้อยืด คว้นดำ", description: "ผ้านุ่ม ใส่สบาย", price: 399, category: "clothing", image: "/images/product1.jpg" },
    { id: 2, name: "หมวกสไตล์", description: "ปกป้องจากแดด", price: 249, category: "accessories", image: "/images/product2.jpg" },
    { id: 3, name: "แก้วน้ำลายสวย", description: "เก็บความร้อน/เย็น", price: 599, category: "home", image: "/images/product3.jpg" },
    { id: 4, name: "แจ็กเก็ตลาย", description: "อบอุ่นและสวยงาม", price: 1299, category: "clothing", image: "/images/product4.jpg" }
  ];

  res.render('shop', { products });
});

app.use('/shop', shopRouter);

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
