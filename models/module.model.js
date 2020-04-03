const Sequelize = require('sequelize')
const Model = Sequelize.Model

class Module extends Model {}



module.exports = (sequelize) => {
    Module.init({
        module_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            unique: true,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        route: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        icon: {
            type: Sequelize.STRING,
            allowNull: false
        },
        description: {
            type: Sequelize.STRING,
            allowNull: false
        }
    },
    {
        sequelize,
        modelName: 'module'
    })

    return Module
} 