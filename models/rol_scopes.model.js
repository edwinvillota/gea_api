const Sequelize = require('sequelize')
const Model = Sequelize.Model

class RolScopes extends Model {}

module.exports = (sequelize) => {
    RolScopes.init({
        id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true
        },
        rol_id: {
            type: Sequelize.DataTypes.UUID,
            allowNull: false,
        },
        scope_id: {
            type: Sequelize.DataTypes.UUID,
        }
    }, {
        sequelize,
        modelName: 'rol_scopes'
    })

    return RolScopes
}