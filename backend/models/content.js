const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

    const Content = sequelize.define('Content', {
      content_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      class_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      content_type: {
          type: DataTypes.ENUM('video', 'document', 'quiz', 'assignment'),
          allowNull: false,
        },
      content_title: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      content_description: {
        type: DataTypes.TEXT,
      },
      content_url: {
        type: DataTypes.STRING(255),
      },
      created_by: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    }, {
      tableName: 'content',
      timestamps: false,
    });
  
    Content.associate = (models) => {
      Content.belongsTo(models.User, { foreignKey: 'created_by' });
      Content.belongsTo(models.Class, { foreignKey: 'class_id' });
    };
  
    return Content;
  