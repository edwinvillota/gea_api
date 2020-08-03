const express = require('express')
const boom = require('@hapi/boom')
const passport = require('passport')

// Services
const UsersService = require('../services/users')

// Validation Schemas
const {
    createUserSchema,
    userNameSchema,
    searchUserSchema
} = require('../utils/schemas/user')

// Validation Handler

const validationHandler = require('../utils/middleware/validationHandler')
const scopesValidationHandler = require('../utils/middleware/scopesValidationHandler')

// Cache

const cacheResponse = require('../utils/cacheResponse')
const { SIXTY_MINUTES_IN_SECONDS } = require('../utils/time')

// Strategies 
require('../utils/auth/strategies/jwt')


function usersApi (app) {
    const router = express.Router()
    app.use("/api/management/users", router)

    const usersService = new UsersService()

    router.get(
        '/:page',
        passport.authenticate('jwt', { session: false }),
        scopesValidationHandler(['read:users']),
        async function(req, res, next) {

        try {
            const { page } = req.params
            const data = await usersService.getUsers({ page })

            res.status(200).json({
                data: data.users,
                total: data.total,
                page: page,
                message: 'users listed'
            })
        } catch (e) {
            next(e)
        }
    })

    router.get(
        '/:username',
        validationHandler(userNameSchema, 'params'),
        passport.authenticate('jwt', { session: false }),
        scopesValidationHandler(['read:user']),
        async function(req, res, next) {
            cacheResponse(res, SIXTY_MINUTES_IN_SECONDS)

            const { username } = req.params

            try {
                const user = await usersService.getUser({ username })

                res.status(200).json(user)
            } catch (e) {
                next(e)
            }
        }
    )

    router.post(
        '/',
        validationHandler(createUserSchema),
        passport.authenticate('jwt', { session: false }),
        scopesValidationHandler(['create:user']),
        async function(req, res, next) {
            const {body: user} = req

            try {
                const createUserObject = await usersService.createUser(user)

                if (createUserObject[1]) {
                    res.status(201).json({
                        data: createUserObject,
                        message: 'user created'
                    })
                } else {
                    next(boom.badRequest('User already exist'))
                }

            } catch (e) {
                next(e)
            }
    })

    router.post(
        '/search',
        validationHandler(searchUserSchema),
        passport.authenticate('jwt', { session: false }),
        scopesValidationHandler(['read:users']),
        async function(req, res, next) {
            const { params, page = 1, limit = 10 } = req.body

            try {
                const data = await usersService.searchUser({ params, page, rows: limit })

                res.status(200).json({
                    data: data.users,
                    total: data.total,
                    page: page,
                    message: 'Users listed'
                })
            } catch (e) {
                next(e)
            }
        }
    )
}

module.exports = usersApi