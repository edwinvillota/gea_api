const express = require('express')
const boom = require('@hapi/boom')
const passport = require('passport')

// Services 
const RolScopesService = require('../services/rolScopes')

// Validation Schemas

const {
    createRolScopeSchema
} = require('../utils/schemas/rol_scopes')
const {
    rolIdSchema
} = require('../utils/schemas/rol')

// Validation Handler

const validationHandler = require('../utils/middleware/validationHandler')
const scopesValidationHandler = require('../utils/middleware/scopesValidationHandler')

// Cache
const cacheResponse = require('../utils/cacheResponse')
const { FIVE_MINUTES_IN_SECONDS, SIXTY_MINUTES_IN_SECONDS } = require('../utils/time')

// Strategies 
require('../utils/auth/strategies/jwt')

function rolScopesApi (app) {
    const router = express.Router()
    app.use('/api/management/rolScopes', router)

    const rolScopesService = new RolScopesService()

    router.get(
        '/',
        passport.authenticate('jwt', { session: false }),
        scopesValidationHandler(['read:roles_scopes']),
        async function(req, res, next) {
            cacheResponse(res, SIXTY_MINUTES_IN_SECONDS)

            try {
                const rolScopes = await rolScopesService.getRolScopes()

                res.status(200).json({
                    data: rolScopes,
                    message: 'rolScopes listeds'
                })
            } catch (e) {
                next(e)
            }
        }
    )

    router.get(
        '/:rolId',
        passport.authenticate('jwt', { session: false }),
        scopesValidationHandler(['read:rol_scopes']),
        validationHandler(rolIdSchema, 'params'),
        async function(req, res, next) {
            cacheResponse(res, SIXTY_MINUTES_IN_SECONDS)

            const { rolId } = req.params

            try {
                const rolScopes = await rolScopesService.getScopesByRol({ rolId })

                res.status(200).json(rolScopes)
            } catch (e) {
                next(e)
            }
        }
    )

    router.post(
        '/',
        passport.authenticate('jwt', { session: false }),
        scopesValidationHandler(['create:rol_scope']),
        validationHandler(createRolScopeSchema),
        async function(req, res, next) {
        
            const {body: addScope} = req
            
            try {
                const addedRolScope = await rolScopesService.addRolScope(addScope)

                if (addedRolScope[1]) {
                    res.status(201).json({
                        data: addedRolScope,
                        message: 'rol scope added'
                    })
                } else {
                    next(boom.badRequest('Rol scope already exists'))
                }

            } catch (e) {
                next(e)
            }
        }
    )
}

module.exports = rolScopesApi