const express = require("express");
const morgan = require('morgan');
const cros = require('cors')
const app = express();

//middlewares
app.use(express.json());
app.use(morgan('dev'))
app.use(cros())

//routes
const userRoutes = require("./routes/v1/user.route");
const categoryRoutes = require("./routes/v1/category.route");
const productRoutes = require("./routes/v1/product.route");
const stockRoutes = require("./routes/v1/stock.route");
const supplierRoutes = require("./routes/v1/supplier.route");
const orderRoutes = require('./routes/v1/order.route')

app.get("/", (req, res) => {
  res.send("Route is working YaY!");
});
app.get("/api/v1/health", (req, res) => {
  res.send("Server is working.");
});

app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);
app.use("/api/v1/stock", stockRoutes);
app.use("/api/v1/supplier", supplierRoutes);
app.use("/api/v1/order", orderRoutes)

module.exports = app;
