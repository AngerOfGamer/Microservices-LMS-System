import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

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
}, {
  tableName: 'absensi',
  timestamps: false,
});

// Relasi
Absensi.associate = (models) => {
  Absensi.belongsTo(models.User, { as: 'User', foreignKey: 'user_id' });
  Absensi.belongsTo(models.Class, { as: 'Class', foreignKey: 'class_id' });
};

export default Absensi;
