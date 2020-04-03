const passport = require('passport')
const { Strategy, ExtractJwt } = require('passport-jwt')
const boom = require('@hapi/boom')

const UserService = require('../../../services/users')
const { config } = require('../../../config')

passport.use(
    new Strategy({
        secretOrKey: config.authJwtSecret,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    },
    async function (tokenPayload, cb) {
        const usersService = new UserService()

        try {
            const user = await usersService.getUser({ username: tokenPayload.username })

            if (!user) {
                return cb(boom.unauthorized(),false)
            }

            delete user.password

            cb(null, {...user, scopes: tokenPayload.scopes})


        } catch (e) {
            return cb(e)
        }
    })
)
