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
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
}, {
    tableName: 'classes',
    timestamps: false,
});

Class.associate = (models) => {
    Class.hasMany(models.ClassMember, { foreignKey: 'class_id' });
    Class.hasMany(models.Content, { foreignKey: 'class_id' });
    Class.hasMany(models.Absensi, { foreignKey: 'class_id' });
    Class.hasMany(models.Submission, { foreignKey: 'class_id' });
};

return Class;

  