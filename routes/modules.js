const express = require('express')
const { modulesMock } = require('../utils/mocks/modules')
const boom = require('@hapi/boom')

// Services
const ModulesService = require('../services/modules')

// Validation schemas
const {
    moduleIdSchema,
    createModuleSchema,
    updateModuleSchema
} = require('../utils/schemas/modules')

// Validation handler

const validationHandler = require('../utils/middleware/validationHandler')

// Cache

const cacheResponse = require('../utils/cacheResponse')
const { FIVE_MINUTES_IN_SECONDS, SIXTY_MINUTES_IN_SECONDS } = require('../utils/time')

function modulesApi(app) {
    const router = express.Router()
    app.use("/api/modules", router) 

    const modulesService = new ModulesService()

    router.get('/', async function(req, res, next) {
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

    router.post('/', validationHandler(createModuleSchema), async function(req, res, next) {
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