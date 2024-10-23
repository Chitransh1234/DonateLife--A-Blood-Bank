const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const morgan = require('morgan');
const cors = require('cors');
const { connectDB } = require('./config/db');

// Dot config
dotenv.config();

// MongoDB connection
connectDB();

// Rest object
const app = express();

// Middlewares
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

// Routes
app.use("/api/v1/test", require("./routes/testRoutes"));
app.use("/api/v1/auth", require("./routes/authRoutes"));
app.use("/api/v1/inventory", require("./routes/inventoryRoutes"));
app.get("/", (req, res) => {
    res.send("Hello World");
});

// Port
const PORT = process.env.PORT || 3000;

// Listen
app.listen(PORT, () => {
    console.log(`Node Server is running In ${process.env.DEV_MODE} on port ${PORT}`.bgBlue.white);
});
