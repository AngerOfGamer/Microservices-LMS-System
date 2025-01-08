const express = require('express');
const connectDB = require('./config/database');
const attendanceRoutes = require("./routes/attendance");
const app = express();

app.use(express.json());
connectDB();

app.use("/attendance", attendanceRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
