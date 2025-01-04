import express from 'express';
import bodyParser from 'body-parser';
import sequelize from './config/database.js';

import absensiRoutes from './routes/absensiRoutes.js';
import contentRoutes from './routes/contentRoutes.js';

const app = express();
app.use(bodyParser.json());

// route
app.use('/api/absensi', absensiRoutes);
app.use('/api/content', contentRoutes);

//sync Database
sequelize.sync()
    .then(() => {
        console.log('Database berhasil disinkronkan');
    })
    .catch((err) => {
        console.error('Terjadi kesalahan saat menyinkronkan database:', err);
    });

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server berjalan di port ${PORT}`);
});
