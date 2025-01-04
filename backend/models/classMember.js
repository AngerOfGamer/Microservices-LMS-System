const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ClassMember = sequelize.define('ClassMember', {
    class_member_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    },
    user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    },
    class_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    },
    role: {
    type: DataTypes.ENUM('dosen', 'mahasiswa'),
    allowNull: false,
    },
    joined_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    },
}, {
    tableName: 'class_members',
    timestamps: false,
});

ClassMember.associate = (models) => {
    // Associations can be defined here
    ClassMember.belongsTo(models.User, { foreignKey: 'user_id' });
    ClassMember.belongsTo(models.Class, { foreignKey: 'class_id' });
};

return ClassMember;  