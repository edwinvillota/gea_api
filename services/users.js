const db = require('../lib/mysqldb')
const bcrypt = require('bcrypt')
const Op = require('sequelize').Op


class UserService {

    async getUsers({ page = 1, rows = 10 }) {
        const offset = (page - 1) * rows

        try {
            const total = await db.users.count()
            const users = await db.users.findAll({
                attributes: ['user_id', 'username', 'name', 'lastname', 'email', 'createdAt'],
                include: [{
                    model: db.roles,
                    attributes: ['name']
                }],
                order: [
                    ['username', 'ASC'],
                ],
                limit: rows,
                offset: offset
            })
            return { users, total } || []
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