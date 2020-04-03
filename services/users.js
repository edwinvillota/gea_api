const db = require('../lib/mysqldb')
const bcrypt = require('bcrypt')
const Op = require('sequelize').Op


class UserService {

    async getUsers() {
        try {
            const users = await db.users.findAll()
            return users || []
        } catch (e) {
            console.log(e)
            return []
        }
    }

    async getUser({ username }) {
        const user = await db.users.findOne({
            attributes: ['user_id','password','username','email','rol_id'],
            where: {
                username: username
            }
        })

        return user.dataValues || false
    }

    async createUser(newUser) {

        const hashedPassword = await bcrypt.hash(newUser.password, 10)

        newUser.password = hashedPassword

        const createUserObject = await db.users.findOrCreate({
            where: {
                [Op.or]: [{username: newUser.username}, {email: newUser.email}]
            },
            defaults: newUser
        })

        return createUserObject
    }
}

module.exports = UserService