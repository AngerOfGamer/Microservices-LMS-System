const express = require('express');
const connectDB = require('./config/database');
const contentRoutes = require("./routes/content");
const app = express();

app.use(express.json());
connectDB();

app.use("/content", contentRoutes);

const PORT = process.env.PORT || 5006;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
