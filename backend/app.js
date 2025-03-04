const express = require('express');
const dotenv = require('dotenv');
const dbConnect = require('./config/dbConnect');
const authRoutes = require("./routes/authRoutes");

//Load environment varaibles from .env file
dotenv.config();


dbConnect();

const app = express();

//Middleware
app.use(express.json());

//Routes
app.use("/api/auth", authRoutes);

//start the server
const PORT = process.env.PORT || 7002;
app.listen(PORT, ()=>{
    console.log(`Server is runing at port ${PORT}`);
});  
