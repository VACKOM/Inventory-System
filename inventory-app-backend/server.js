const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');
const connect = require("./config/connect");
const product = require("./routes/products");

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(product);

//Connect to the database and then start the server
app.listen(PORT, () =>{
    connect.connectToServer();
    
    console.log(`Server is running on ${PORT}`);
})
