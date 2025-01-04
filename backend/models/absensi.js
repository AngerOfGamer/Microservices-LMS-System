const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

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

Absensi.associate = (models) => {
    // Associations can be defined here
    Absensi.belongsTo(models.User, { foreignKey: 'user_id' });
    Absensi.belongsTo(models.Class, { foreignKey: 'class_id' });
};

return Absensi;  