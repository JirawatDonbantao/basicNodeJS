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
  // ข้อมูลตัวอย่างที่ถูกต้อง ควรมาจากฐานข้อมูลในแอปจริง
  const productsData = [
    { 
      id: 1,
      name: "เสื้อยืด คว้นดำ", 
      description: "ผ้านุ่ม ใส่สบาย",
      price: 799,
      category: "clothing",
      image: "https://via.placeholder.com/250/000000/FFFFFF/?text=KwanDum+T-Shirt"
    },
    { 
      id: 2,
      name: "เสื้อยืด คว้นขาว", 
      description: "ผ้านุ่ม สีคลาสสิก",
      price: 600,
      category: "clothing",
      image: "https://via.placeholder.com/250/FFFFFF/000000/?text=KwanDum+T-Shirt"
    },
    { 
      id: 3,
      name: "เสื้อยืด คว้นสี", 
      description: "ผ้านุ่ม สีสันสดใส",
      price: 999,
      category: "clothing",
      image: "https://via.placeholder.com/250/3498db/FFFFFF/?text=KwanDum+T-Shirt"
    },
    {
      id: 4, name: "แก้วน้ำ คว้นดำ",
      description: "แก้วเก็บความเย็น",
      price: 499,
      category: "accessories",
      image: "https://via.placeholder.com/250/000000/FFFFFF/?text=KwanDum+Mug"
    },
  ];
  res.render("shop", { products: productsData });
});

app.use("/shop", shopRouter);

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
