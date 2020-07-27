const db = require('../lib/mysqldb')

class ScopeService {
    async getScopes ({ page = 1, rows = 10 }) {
        const offset = (page - 1) * rows

        try {
            const total = await db.scopes.count()
            const scopes = await db.scopes.findAll({
                attributes: ['scope_id', 'name', 'type', 'resource', 'createdAt'],
                limit: rows,
                offset: offset,
            })
            return { scopes, total } || []
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