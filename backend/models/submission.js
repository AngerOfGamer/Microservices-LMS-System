const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

    const Submission = sequelize.define('Submission', {
      submission_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      task_title: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      class_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      submission_date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      submission_url: {
        type: DataTypes.STRING(255),
      },
    }, {
      tableName: 'submissions',
      timestamps: false,
    });
  
    Submission.associate = (models) => {
      // Associations can be defined here
      Submission.belongsTo(models.User, { foreignKey: 'user_id' });
      Submission.belongsTo(models.Class, { foreignKey: 'class_id' });
    };
  
    return Submission;
  