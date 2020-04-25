const db = require('../lib/mysqldb')
const Op = require('sequelize').Op


class RolModulesService {

    async getRolModules () {
        try {
            const rolModules = await db.rolModules.findAll()

            return rolModules || []
        } catch (e) {
            console.log(e)
            return []
        }
    }

    async getModulesByRol ({ rolId }) {
        try {
            const modules = await db.rolModules.findAll({
                attributes: [],
                where: {
                    rol_id: rolId
                },
                include: [{
                    model: db.modules,
                    attributes: ['name', 'icon', 'route', 'hasSubmodules'],
                    include: [{
                        model: db.submodules,
                        attributes: ['name', 'route', 'icon', 'auth_scope']
                    }]
                }]
            }).then(modules => {
                return (
                    modules.map(s => s.module)
                )
            })

            return modules || []
        } catch (e) {
            console.log(e)
            return []
        }
    }

    async addRolModule ( {rolId, moduleId} ) {

        try {
            const addedRolModule = await db.rolModules.findOrCreate({
                where: {
                    [Op.and]: [{rol_id: rolId},{module_id: moduleId}]
                },
                defaults: {rol_id: rolId, module_id: moduleId}
            })

            return addedRolModule
        } catch (e) {
            console.log(e)
            return []
        }
    } 
}

module.exports = RolModulesService
