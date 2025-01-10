const express = require('express');
const connectDB = require('./config/database');
const notificationRoutes = require("./routes/notification");
const app = express();

app.use(express.json());
connectDB();

app.use("/notification", notificationRoutes);

const PORT = process.env.PORT || 5003;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
