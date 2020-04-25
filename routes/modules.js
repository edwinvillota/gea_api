const express = require('express')
const boom = require('@hapi/boom')
const passport = require('passport')

// Services
const ModulesService = require('../services/modules')

// Validation schemas
const {
    createModuleSchema,
} = require('../utils/schemas/modules')

// Validation handler

const validationHandler = require('../utils/middleware/validationHandler')
const scopesValidationHandler = require('../utils/middleware/scopesValidationHandler')

// Cache

const cacheResponse = require('../utils/cacheResponse')
const { FIVE_MINUTES_IN_SECONDS, SIXTY_MINUTES_IN_SECONDS } = require('../utils/time')

// Strategies
require('../utils/auth/strategies/jwt')

function modulesApi(app) {
    const router = express.Router()
    app.use("/api/management/modules", router) 

    const modulesService = new ModulesService()

    router.get(
        '/',
        passport.authenticate('jwt', { session: false }),
        scopesValidationHandler(['read:modules']),
        async function(req, res, next) {
            cacheResponse(res, SIXTY_MINUTES_IN_SECONDS)
            try {
                const modules = await modulesService.getModules()
                res.status(200).json({
                    data: modules,
                    message: 'modules listed'
                })
            } catch (err) {
                next(err)
            }
    })

    router.post(
        '/',
        validationHandler(createModuleSchema),
        passport.authenticate('jwt', { session: false }),
        scopesValidationHandler(['create:module']),
        async function(req, res, next) {
            const { body: module } = req
            try {
                const createModuleId = await modulesService.createModule(module)

                if (createModuleId[1]) {
                    res.status(201).json({
                        data: createModuleId,
                        message: 'module created'
                    })
                } else {
                    next(boom.badRequest('Module already exist'))
                }

        } catch (e) {
            next(e)
        }
    })
}

module.exports = modulesApi