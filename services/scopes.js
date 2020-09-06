const db = require('../lib/mysqldb')
const bcrypt = require('bcrypt')
const Op = require('sequelize').Op

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

    async searchScope({ params = [], page = 1, rows = 10 }) {
        const offset = (page - 1) * rows

        try {
            const queryParams = params.map(({ propname, value }) => {
                return {
                    [propname]: {
                        [Op.like]: `%${value}%`
                    }
                }
            })

            const configQuery = {
                attributes: ['scope_id', 'name', 'type', 'resource', 'createdAt'],
                where: {
                    [Op.and]: queryParams
                },
                limit: rows,
                offset: offset,
            }

            const total = await db.scopes.count({ where: configQuery.where })
            const scopes = await db.scopes.findAll(configQuery)

            return { scopes, total } || []
        } catch (error) {
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