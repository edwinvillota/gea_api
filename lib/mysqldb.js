const dbConfig = require('../config/db')

const Sequelize = require('sequelize')

const sequelize = new Sequelize(dbConfig.db, dbConfig.user, dbConfig.password, {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    operatorAliases: false,

    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
})

const db = sequelize

db.sequelize = sequelize

//sequelize.sync()

// Models - Tables
db.users = require('../models/user.model')(sequelize)
db.modules = require('../models/module.model')(sequelize)
db.roles = require('../models/rol.model')(sequelize)
db.scopes = require('../models/scope.model')(sequelize)
db.rolScopes = require('../models/rol_scopes.model')(sequelize)

// Relations
db.roles.hasMany(db.rolScopes, { foreignKey: 'rol_id'})
db.rolScopes.belongsTo(db.scopes, { foreignKey: 'scope_id', sourceKey: 'scope_id'})


module.exports = db

