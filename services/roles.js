const db = require('../lib/mysqldb')
const generateRandomToken = require('../utils/generateRandomToken')

class RolService {

    async getRoles () {
        try {
            const roles = await db.roles.findAll({
                attributes: ['rol_id', 'name', 'description', 'createdAt'],
            })
            return roles || []
        } catch (e) {
            console.log(e)
            return []
        }
    }

    async getApyKey ({ rolId }) {
        try {
            const apikey = await db.roles.findOne({
                attributes: ['apikey'],
                where: {
                    rol_id: rolId
                },
            })

            return apikey || false
        } catch (e) {
            console.log(e)
            return false
        }
    }

    async createRol (newRol) {

        newRol.apikey = generateRandomToken()

        const crateRolObject = await db.roles.findOrCreate({
            where: {
                name: newRol.name
            },
            defaults: newRol
        })

        return crateRolObject
    }

}

module.exports = RolService