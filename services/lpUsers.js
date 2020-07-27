const db = require('../lib/mysqldb')

class LpUsersService {

  async getUsers() {
    try {
      const lpUsers = await db.lpUsers.findAll()

      return lpUsers || []
    } catch (e) {
      console.log(e)
      return []
    }
  }

  async getLpUser({ code }) {
    const lpUser = await db.lpUsers.findOne({
      attributes: ['code', 'name', 'address', 'rateType'],
      where: {
        code: code
      }
    })

    return lpUser.dataValues || false
  }

}

module.exports = LpUsersService