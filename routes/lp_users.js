const express = require('express')
const passport = require('passport')

// Services
const LpUsersService = require('../services/lpUsers')

// Validation schemas
const {
  createLpUserSchema,
  queryLpUserCodeSchema
} = require('../utils/schemas/lp_users')

// Validation handler
const validationHandler = require('../utils/middleware/validationHandler')
const scopesValidationHandler = require('../utils/middleware/scopesValidationHandler')

// Cache

const cacheResponse = require('../utils/cacheResponse')
const { SIXTY_MINUTES_IN_SECONDS } = require('../utils/time')

// Strategies
require('../utils/auth/strategies/jwt')

function lpUsersApi(app) {
  const router = express.Router()
  app.use('/api/dbs/lpusers', router)

  const lpUsersService = new LpUsersService()

  router.get(
    '/',
    validationHandler(createLpUserSchema),
    passport.authenticate('jwt', { session: false }),
    scopesValidationHandler(['read:lp_users']),
    async function (req, res, next) {
      cacheResponse(res, SIXTY_MINUTES_IN_SECONDS)

      try {
        const lpUsers = await lpUsersService.getUsers()
        res.status(200).json({
          data: lpUsers,
          message: 'lpUsers listed'
        })
      } catch (err) {
        next(err)
      }
    }
  )

  router.get(
    '/:code',
    validationHandler(queryLpUserCodeSchema, 'params'),
    passport.authenticate('jwt', { session: false }),
    scopesValidationHandler(['read:lp_user']),

    async function (req, res, next) {
      cacheResponse(res, SIXTY_MINUTES_IN_SECONDS)

      const { code } = req.params

      try {
        const lpUser = await lpUsersService.getLpUser({ code })

        res.status(200).json({
          data: lpUser,
          message: 'lpUser listed'
        })
      } catch (e) {
        next(e)
      }
    }
  )
}

module.exports = lpUsersApi