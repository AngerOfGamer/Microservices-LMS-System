const express = require('express');
const connectDB = require('./config/database');
const submissionRoutes = require("./routes/submission");
const app = express();

app.use(express.json());
connectDB();

app.use("/submission", submissionRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
