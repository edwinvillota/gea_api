const db = require('../lib/mysqldb')

class ScopeService {
    async getScopes () {
        try {
            const scopes = db.scopes.findAll()
            return scopes || []
        } catch (e) {
            console.log(e)
            return []
        }
    }

    async createScope (newScope) {
        const createScopeObject = await db.scopes.findOrCreate({
            where: {
                name: newScope.name
            },
            defaults: newScope
        })

        return createScopeObject
    }
}

module.exports = ScopeService