import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';

// Konfigurasi dotenv
dotenv.config();

// Konfigurasi Sequelize
const sequelize = new Sequelize(
  process.env.DB_NAME,      // Nama database
  process.env.DB_USER,      // Username
  process.env.DB_PASSWORD,  // Password
  {
    host: process.env.DB_HOST, // Host database
    dialect: 'mysql',          // Dialek database
    logging: false,            // Menonaktifkan logging SQL
  }
);

// Cek koneksi ke database
sequelize.authenticate()
  .then(() => console.log('Database connected'))
  .catch(err => console.error('Database connection error:', err));

export default sequelize;
