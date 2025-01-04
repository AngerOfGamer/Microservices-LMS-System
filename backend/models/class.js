const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Class = sequelize.define('Class', {
  class_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  class_name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
}, {
  tableName: 'class',
  timestamps: false,
});

// Relasi jika ada
Class.associate = (models) => {
  Class.hasMany(models.Content, { as: 'Contents', foreignKey: 'class_id' });
};

module.exports = Class;
