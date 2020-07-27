const express = require('express')
const boom = require('@hapi/boom')
const passport = require('passport')

// Services 
const ScopeService = require('../services/scopes')

// Validation Schemas

const {
    scopeIdSchema,
    createScopeSchema
} = require('../utils/schemas/scope')

const {
    rolIdSchema
} = require('../utils/schemas/rol')
// Validation Handler

const validationHandler = require('../utils/middleware/validationHandler')
const scopesValidationHandler = require('../utils/middleware/scopesValidationHandler')

// Cache
const cacheResponse = require('../utils/cacheResponse')
const { SIXTY_MINUTES_IN_SECONDS } = require('../utils/time')

// Strategies 
require('../utils/auth/strategies/jwt')

function scopesApi (app) {
    const router = express.Router()
    app.use('/api/management/scopes', router)

    const scopesService = new ScopeService()

    router.get(
        '/:page',
        passport.authenticate('jwt', { session: false }),
        scopesValidationHandler(['read:scopes']),
        async function(req, res, next) {
            cacheResponse(res, SIXTY_MINUTES_IN_SECONDS)

            try {
                const { page } = req.params
                const data = await scopesService.getScopes({ page })

                res.status(200).json({
                    data: data.scopes,
                    total: data.total,
                    page: page,
                    message: 'scopes listed'
                })
            } catch (e) {
                next(e)
            }
        }
    )

    router.post(
        '/',
        validationHandler(createScopeSchema),
        passport.authenticate('jwt', { session: false }),
        scopesValidationHandler(['create:scope']),
        async function(req, res, next) {
            const {body: scope} = req

            try {
                const createScopeObject = await scopesService.createScope(scope)

                if (createScopeObject[1]) {
                    res.status(201).json({
                        data: createScopeObject,
                        message: 'new scope created'
                    })
                } else {
                    next(boom.badRequest('Scope already exists'))
                }
            } catch (e) {
                next(e)
            }
        }
    )
}

module.exports = scopesApi