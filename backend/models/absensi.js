// Mengimpor Sequelize dan koneksi database
import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js'; // Koneksi database yang sudah diekspor dengan default
import Class from '../models/class.js';

// Definisikan model Absensi
const Absensi = sequelize.define('Absensi', {
    absensi_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    class_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM('hadir', 'tidak hadir'),
        allowNull: false,
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
}, {
    tableName: 'absensi',
    timestamps: false,
});

// Menambahkan asosiasi (jika ada)
Absensi.associate = (models) => {
    Absensi.belongsTo(models.User, { foreignKey: 'user_id' });
    Absensi.belongsTo(models.Class, { foreignKey: 'class_id' });
};

// Ekspor model Absensi
export default Absensi;
