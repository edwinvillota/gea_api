const express = require('express')
const boom = require('@hapi/boom')
const passport = require('passport')

// Services 
const SubmoduleService = require('../services/submodules')

// Validation Schemas

const {
    createSubmoduleSchema
} = require('../utils/schemas/submodule')

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

function submodulesApi (app) {
    const router = express.Router()
    app.use('/api/management/submodules', router)

    const submodulesService = new SubmoduleService()

    router.get(
        '/',
        passport.authenticate('jwt', { session: false }),
        scopesValidationHandler(['read:submodules']),
        async function(req, res, next) {
            cacheResponse(res, SIXTY_MINUTES_IN_SECONDS)

            try {
                const submodules = await submodulesService.getSubmodules()

                res.status(200).json({
                    data: submodules,
                    message: 'submodules listed'
                })
            } catch (e) {
                next(e)
            }
        }
    )

    router.get(
        '/:rolId',
        passport.authenticate('jwt', { session: false }),
        scopesValidationHandler(['read:submodules']),
        validationHandler(rolIdSchema, 'params'),
        async function(req, res, next) {
            cacheResponse(res, SIXTY_MINUTES_IN_SECONDS)

            const { rolId } = req.params

            try {
                const rolSubmodules = await submodulesService.getSubmodulesByRol({ rolId })

                res.status(200).json({
                    data: rolSubmodules,
                    message: 'submodules listed'
                })
            } catch (e) {
                next(e)
            }
        }
    )

    router.post(
        '/',
        validationHandler(createSubmoduleSchema),
        passport.authenticate('jwt', { session: false }),
        scopesValidationHandler(['create:submodule']),
        async function(req, res, next) {
            const {body: submodule} = req

            try {
                const createSubmoduleObject = await submodulesService.createSubmodule(submodule)

                if (createSubmoduleObject[1]) {
                    res.status(201).json({
                        data: createSubmoduleObject,
                        message: 'new submodule created'
                    })
                } else {
                    next(boom.badRequest('Submodule already exists'))
                }
            } catch (e) {
                next(e)
            }
        }
    )
}

module.exports = submodulesApi