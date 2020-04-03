const Sequelize = require('sequelize')
const Model = Sequelize.Model

class Scope extends Model {}

module.exports = (sequelize) => {
    Scope.init({
        scope_id: {
            type: Sequelize.DataTypes.UUID,
            defaultValue: Sequelize.DataTypes.UUIDV1,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        type: {
            type: Sequelize.STRING,
            allowNull: false
        },
        resource: {
            type: Sequelize.STRING,
            allowNull: false
        },
    }, {
        sequelize,
        modelName: 'scope'
    })

    return Scope
}