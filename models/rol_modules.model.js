const Sequelize = require('sequelize')
const Model = Sequelize.Model

class RolModules extends Model {}

module.exports = (sequelize) => {
    RolModules.init({
        id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true
        },
        rol_id: {
            type: Sequelize.DataTypes.UUID,
            allowNull: false,
        },
        module_id: {
            type: Sequelize.DataTypes.UUID,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'rol_modules'
    })

    return RolModules
}