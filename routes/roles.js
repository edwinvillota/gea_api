const express = require('express')
const boom = require('@hapi/boom')
const passport = require('passport')

// Services 
const RolesService = require('../services/roles')

// Validation Schemas

const {
    rolIdSchema,
    createRolSchema
} = require('../utils/schemas/rol')

// Validation Handler

const validationHandler = require('../utils/middleware/validationHandler')
const scopesValidationHandler = require('../utils/middleware/scopesValidationHandler')

// Cache
const cacheResponse = require('../utils/cacheResponse')
const { FIVE_MINUTES_IN_SECONDS, SIXTY_MINUTES_IN_SECONDS } = require('../utils/time')

// Strategies 
require('../utils/auth/strategies/jwt')


function rolesApi (app) {
    const router = express.Router()
    app.use('/api/management/roles', router)

    const rolesService = new RolesService()

    router.get(
        '/',
        passport.authenticate('jwt', { session: false }),
        scopesValidationHandler(['read:roles']),
        async function(req, res, next) {
            cacheResponse(res, FIVE_MINUTES_IN_SECONDS)

            try {
                const roles = await rolesService.getRoles()

                res.status(200).json({
                    data: roles,
                    message: 'roles listed'
                })
            } catch (e) {
                next(e)
            }
        }
    )

    router.post(
        '/',
        passport.authenticate('jwt', { session: false }),
        scopesValidationHandler(['create:rol']),
        validationHandler(createRolSchema),
        async function(req, res, next) {
            const {body: rol} = req

            try {
                const createRolObject = await rolesService.createRol(rol)

                if (createRolObject[1]) {
                    res.status(201).json({
                        data: createRolObject,
                        message: 'new rol created'
                    })
                } else {
                    next(boom.badRequest('Rol already exists'))
                }

            } catch (e) {
                next(e)
            }
        }
    )
}

module.exports = rolesApi