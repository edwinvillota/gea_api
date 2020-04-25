const dbConfig = require('../config/db')
const Sequelize = require('sequelize')
require('dotenv').config()

const sequelize = new Sequelize(dbConfig.db, dbConfig.user, dbConfig.password, {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    operatorAliases: false,
    timezone: '-05:00',
    logging: (process.env.NODE_ENV !== 'production') ? true : false,

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
db.submodules = require('../models/submodule.model')(sequelize)
db.roles = require('../models/rol.model')(sequelize)
db.scopes = require('../models/scope.model')(sequelize)
db.rolScopes = require('../models/rol_scopes.model')(sequelize)
db.rolModules = require('../models/rol_modules.model')(sequelize)

// Relations
db.roles.hasMany(db.rolScopes, { foreignKey: 'rol_id'})
db.roles.hasMany(db.rolModules, { foreignKey: 'rol_id'})
db.rolScopes.belongsTo(db.scopes, { foreignKey: 'scope_id', sourceKey: 'scope_id'})
db.rolModules.belongsTo(db.modules, { foreignKey: 'module_id', sourceKey: 'module_id'})
db.modules.hasMany(db.submodules, { foreignKey: 'module_id', sourceKey: 'module_id'})
db.submodules.belongsTo(db.modules, { foreignKey: 'module_id', sourceKey: 'module_id'})



module.exports = db

