const express = require('express')
const boom = require('@hapi/boom')
const passport = require('passport')

// Services 
const RolModulesService = require('../services/rolModules')

// Validation Schemas

const {
    createRolModuleSchema
} = require('../utils/schemas/rol_modules')
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

function rolModulesApi (app) {
    const router = express.Router()
    app.use('/api/management/rolModules', router)

    const rolModulesService = new RolModulesService()

    router.get(
        '/',
        passport.authenticate('jwt', { session: false }),
        scopesValidationHandler(['read:roles_modules']),
        async function(req, res, next) {
            cacheResponse(res, SIXTY_MINUTES_IN_SECONDS)

            try {
                const rolModules = await rolModulesService.getRolModules()

                res.status(200).json({
                    data: rolModules,
                    message: 'rolModules listeds'
                })
            } catch (e) {
                next(e)
            }
        }
    )

    router.get(
        '/:rolId',
        passport.authenticate('jwt', { session: false }),
        scopesValidationHandler(['read:rol_modules']),
        validationHandler(rolIdSchema, 'params'),
        async function(req, res, next) {
            cacheResponse(res, SIXTY_MINUTES_IN_SECONDS)

            const { rolId } = req.params

            try {
                const rolModules = await rolModulesService.getModulesByRol({ rolId })

                res.status(200).json(rolModules)
            } catch (e) {
                next(e)
            }
        }
    )

    router.post(
        '/',
        passport.authenticate('jwt', { session: false }),
        scopesValidationHandler(['create:rol_module']),
        validationHandler(createRolModuleSchema),
        async function(req, res, next) {
        
            const {body: addModule} = req
            
            try {
                const addedRolModule = await rolModulesService.addRolModule(addModule)

                if (addedRolModule[1]) {
                    res.status(201).json({
                        data: addedRolModule,
                        message: 'rol Module added'
                    })
                } else {
                    next(boom.badRequest('Rol Module already exists'))
                }

            } catch (e) {
                next(e)
            }
        }
    )
}

module.exports = rolModulesApi