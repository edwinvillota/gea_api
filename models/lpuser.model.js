const Sequelize = require('sequelize')
const Model = Sequelize.Model

class LpUser extends Model {}

module.exports = (sequelize) => {
  LpUser.init({
    code: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    }, 
    address: {
      type: Sequelize.STRING,
      allowNull: false
    },
    rateType: {
      type: Sequelize.INTEGER,
      allowNull: false
    }
  },
  {
    sequelize,
    modelName: 'lpuser'
  })

  return LpUser
}