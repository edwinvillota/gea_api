const db = require('../lib/mysqldb')
const Op = require('sequelize').Op


class RolScopesServices {

    async getRolScopes () {
        try {
            const rolScopes = await db.rolScopes.findAll()

            return rolScopes || []
        } catch (e) {
            console.log(e)
            return []
        }
    }

    async getScopesByRol ({ rolId }) {
        try {
            const scopes = await db.rolScopes.findAll({
                attributes: [],
                where: {
                    rol_id: rolId
                },
                include: [{
                    model: db.scopes,
                    attributes: ['name']
                }]
            }).then(scopes => {
                return (
                    scopes.map(s => s.scope.name)
                )
            })

            return scopes || []
        } catch (e) {
            console.log(e)
            return []
        }
    }   

    async addRolScope ( {rolId, scopeId} ) {

        try {
            const addedRolScope = await db.rolScopes.findOrCreate({
                where: {
                    [Op.and]: [{rol_id: rolId},{scope_id: scopeId}]
                },
                defaults: {rol_id: rolId, scope_id: scopeId}
            })

            return addedRolScope 
        } catch (e) {
            console.log(e)
            return []
        }
    } 
}

module.exports = RolScopesServices
