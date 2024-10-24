const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');
const connect = require("./config/connect");
const product = require("./routes/products");
const supplier = require("./routes/suppliers")
const category = require("./routes/productCategories")
const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use( product);
app.use(supplier);
app.use(category);

//Connect to the database and then start the server
app.listen(PORT, () =>{
    connect.connectToServer();
    
    console.log(`Server is running on ${PORT}`);
})
