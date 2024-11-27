const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const dotenv = require("dotenv").config();
const dbConnect = require("./config/connect");

const stockRouter = require("./routes/api/stockRouter");
const assetRoutes = require("./routes/api/assetRoutes");
const staffRoutes = require("./routes/api/staffRoutes");
const supplierRoutes = require("./routes/api/supplierRoutes");
const departmentRoutes = require("./routes/api/departmentRoutes");

const authRoutes = require("./routes/users/authRouters");
const userRoutes = require("./routes/users/userRouters");
const app = express();


// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

//Routes
app.use('/api/supplier', supplierRoutes);
app.use('/api/asset', assetRoutes);
app.use('/api/staff', staffRoutes);
app.use('/api/supplier', supplierRoutes);
app.use('/api/department', departmentRoutes);

app.use('/api/auth' , authRoutes);
app.use('/api/users', userRoutes);

//Connect to the database and then start the server 
dbConnect();
const PORT= process.env.PORT || 5000;

app.listen(PORT, () =>{
    console.log(`Server is running on ${PORT}`);
})