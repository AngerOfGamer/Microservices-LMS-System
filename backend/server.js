import express from 'express';
import dotenv from 'dotenv';
import courseRoutes from './routes/courseRoutes'; 

dotenv.config();

const app = express();


app.use(express.json());
app.use('/api', courseRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
