const express = require("express");
const morgan = require("morgan");
const cors = require("cors"); // fixed typo
const app = express();

// Middlewares
app.use(express.json());
app.use(morgan("dev"));
app.use(cors()); // fixed typo

// Routes
const userRoutes = require("./routes/v1/user.route");
const categoryRoutes = require("./routes/v1/category.route");
const productRoutes = require("./routes/v1/product.route");
const stockRoutes = require("./routes/v1/stock.route");
const supplierRoutes = require("./routes/v1/supplier.route");
const orderRoutes = require("./routes/v1/order.route");
const customerRoutes = require("./routes/v1/customer.route");

app.get("/", (req, res) => {
  res.send("Route is working YaY!");
});

app.get("/api/v1/health", (req, res) => {
  res.send("Server is working.");
});

// API Routes
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);
app.use("/api/v1/stock", stockRoutes);
app.use("/api/v1/supplier", supplierRoutes);
app.use("/api/v1/order", orderRoutes);
app.use("/api/v1/customer", customerRoutes);

// 404 Not Found Handler
app.use((req, res, next) => {
  res.status(404).json({ status: "fail", message: "Route not found" });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);

  res.status(err.statusCode || 500).json({
    status: "error", // fixed typo
    message: err.message || "Something went wrong",
    // error: err.name, // optional: add error type
    // stack: process.env.NODE_ENV === "development" ? err.stack : undefined
  });
});

module.exports = app;
