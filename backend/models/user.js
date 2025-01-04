const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

    const User = sequelize.define('User', {
      user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      username: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      nip_nim: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
      },
      role: {
        type: DataTypes.ENUM('admin', 'dosen', 'mahasiswa'),
        allowNull: false,
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    }, {
      tableName: 'users',
      timestamps: false,
    });
  
    User.associate = (models) => {
      User.hasMany(models.ClassMember, { foreignKey: 'user_id' });
      User.hasMany(models.Content, { foreignKey: 'created_by' });
      User.hasMany(models.Absensi, { foreignKey: 'user_id' });
      User.hasMany(models.Submission, { foreignKey: 'user_id' });
    };
  
    return User;