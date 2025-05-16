const express = require('express');
const app = express();


//middlewares
app.use(express.json());

//routes
const userRoutes = require("./routes/v1/user.route");
const categoryRoutes = require('./routes/v1/category.route')
const productRoutes = require('./routes/v1/product.route')
const stockRoutes = require('./routes/v1/stock.route')
const supplierRoutes = require('./routes/v1/supplier.route')



app.get('/', (req, res) => {
    res.send('Route is working YaY!')
})

app.use('/api/v1/auth',userRoutes)
app.use('/api/v1/category', categoryRoutes)
app.use('/api/v1/product', productRoutes)
app.use('/api/v1/stock', stockRoutes)
app.use('/api/v1/supplier', supplierRoutes)


module.exports = app;
