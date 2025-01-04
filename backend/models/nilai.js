const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

    const Nilai = sequelize.define('Nilai', {
      nilai_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      submission_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      grade: {
        type: DataTypes.DECIMAL(5, 2), // Nilai, misalnya 90.00
      },
      feedback: {
        type: DataTypes.TEXT,
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    }, {
      tableName: 'nilai',
      timestamps: false,
    });
  
    Nilai.associate = (models) => {
      Nilai.belongsTo(models.Submission, { foreignKey: 'submission_id' });
    };
  
    return Nilai;
