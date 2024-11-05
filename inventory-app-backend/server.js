const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');
const connect = require("./config/connect");
const product = require("./routes/api/products");
const supplier = require("./routes/api/suppliers");
const category = require("./routes/api/productCategories");
const customer = require("./routes/api/customers")
const sales = require("./routes/api/sales");
const reorder = require("./routes/api/reorders");
const salesperson = require("./routes/api/salesPeople");
const stock = require("./routes/api/stock")
const stockRouter = require("./routes/api/stockRouter")
const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use('/api/product',product);
app.use('/api/supplier',supplier);
app.use('/api/category',category);
app.use('/api/customer', customer);
app.use('/api/sales', sales);
app.use('/api/salesperson',salesperson);
app.use('/api/reorder', reorder);
app.use('/api/stock', stock);
app.use('/api/stockRouter', stockRouter)
//Connect to the database and then start the server
app.listen(PORT, () =>{
    connect.connectToServer();
    
    console.log(`Server is running on ${PORT}`);
})
