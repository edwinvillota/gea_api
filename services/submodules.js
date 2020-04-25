const db = require('../lib/mysqldb')

class SubmoduleService {
    async getSubmodules () {
        try {
            const submodules = db.submodules.findAll()
            return submodules || []
        } catch (e) {
            console.log(e)
            return []
        }
    }

    async getSubmodulesByRol ({ rolId }) {
        try {
            const scopes = await db.rolScopes.findAll({
                attributes: [],
                where: {
                    rol_id: rolId
                },
                include: [{
                    model: db.scopes,
                    attributes: ['name'],
                    include: [{
                        model: db.submodules,
                        attributes: ['name', 'route', 'icon'],
                        include: [{
                            model: db.modules,
                            attributes: ['name', 'route', 'icon'],
                        }]
                    }]
                }]
            }).then(scopes => {

                const modules = []
                scopes.forEach(s => {

                    modules.push(s.scope.submodule.module)
                })

                return modules.unique()
            })

            return scopes
        } catch (e) {
            console.log(e)
        }
    }

    async createSubmodule (newSubmodule) {
        const createSubmoduleObject = await db.submodules.findOrCreate({
            where: {
                name: newSubmodule.name
            },
            defaults: newSubmodule
        })

        return createSubmoduleObject
    }
}

module.exports = SubmoduleService