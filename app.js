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
  res.send("Welcome to the Shop!");
});

app.use("/shop", shopRouter);

// Add explicit GET handler for /shop to avoid "Cannot GET /shop" and help debugging
app.get("/shop", (req, res) => {
  res.send("Welcome to the Shop!");
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
