const express = require('express');
const connectDB = require('./config/database');
const classRoutes = require("./routes/class");
const app = express();

app.use(express.json());
connectDB();

app.use("/class", classRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
