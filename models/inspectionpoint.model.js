const Sequelize = require('sequelize')
const Model = Sequelize.Model

class InspectionPoint extends Model {}

module.exports = (sequelize) => {
  InspectionPoint.init({
    point_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      unique: true,
      primaryKey: true,
      autoIncrement: true
    },
    type: {
      type: Sequelize.STRING,
      allowNull: false
    },
    structure: {
      type: Sequelize.STRING,
      allowNull: false
    },
    latitude: {
      type: Sequelize.STRING,
      allowNull: false
    },
    longitude: {
      type: Sequelize.STRING,
      allowNull: false
    },
    comment: {
      type: Sequelize.TEXT,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'ipoint'
  })
}