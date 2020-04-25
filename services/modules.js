const { modulesMock } = require('../utils/mocks/modules')
const db = require('../lib/mysqldb')
const Op = require('sequelize').Op

class ModulesService {
    
    async getModules() {
        try {
            const modules = await db.modules.findAll({
                include: [{
                    model: db.submodules,
                    attributes: ['submodule_id', 'name', 'route', 'icon']
                }]
            })
            return modules || []
        } catch (e) {
            console.log(e)
            return []
        }
    }

    async getModule() {
        const module = await Promise.resolve(modulesMock[0])
        return module || {}
    }

    async createModule(newModule) {
        const createModuleObject = await db.modules.findOrCreate({
            where: {
                [Op.or]: [{name: newModule.name}, {route: newModule.route}]
            },
            defaults: newModule
        })

        return createModuleObject
    }

    async updateModule() {
        const updateModuleId = await Promise.resolve(modulesMock[0].module_id)
        return updateModuleId
    }

    async deleteModule() {
        const deletedModuleId = await Promise.resolve(modulesMock[0].module_id)
        return deletedModuleId
    }
}

module.exports = ModulesService