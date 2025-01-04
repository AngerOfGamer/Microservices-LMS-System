import express from 'express';
import bodyParser from 'body-parser';
import sequelize from './config/database.js';
import absensiRoutes from './routes/absensiRoutes.js';

const app = express();
app.use(bodyParser.json());

// route
app.use('/absensi', absensiRoutes);

sequelize.sync()
    .then(() => {
        console.log('Database berhasil disinkronkan');
    })
    .catch((err) => {
        console.error('Terjadi kesalahan saat menyinkronkan database:', err);
    });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server berjalan di port ${PORT}`);
});
