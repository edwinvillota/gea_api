const Sequelize = require('sequelize')
const Model = Sequelize.Model

class Rol extends Model {}

module.exports = (sequelize) => {
    Rol.init({
        rol_id: {
            type: Sequelize.DataTypes.UUID,
            defaultValue: Sequelize.DataTypes.UUIDV1,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        description: {
            type: Sequelize.STRING,
            allowNull: false
        },
        apikey: {
            type: Sequelize.STRING,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'rol'
    })

    return Rol
} 