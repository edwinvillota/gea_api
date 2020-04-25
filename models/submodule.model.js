const Sequelize = require('sequelize')
const Model = Sequelize.Model

class Submodule extends Model {}

module.exports = (sequelize) => {
    Submodule.init({
        submodule_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            unique: true,
            primaryKey: true
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
        module_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        auth_scope: {
            type: Sequelize.STRING,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'submodule'
    })

    return Submodule
}