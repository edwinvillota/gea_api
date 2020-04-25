const express = require('express')
const passport = require('passport')
const boom = require('@hapi/boom')
const jwt = require('jsonwebtoken')

// Services
const RolService = require('../services/roles')
const UsersService = require('../services/users')
const RolScopesService = require('../services/rolScopes')

// Validation
const validationHandler = require('../utils/middleware/validationHandler')

// Validation Schemas

const { createUserSchema } = require('../utils/schemas/user')

const { config } = require('../config')

// Basic Strategy
require('../utils/auth/strategies/basic')

function authApi (app) {
    const router = express.Router()
    app.use('/api/auth', router)

    const rolesService = new RolService()
    const usersService = new UsersService()
    const rolScopesService = new RolScopesService()

    router.post('/sign-in', async function(req, res, next) {

        passport.authenticate('basic', function (error, user) {
            try {
                if (error || !user) {
                    next(boom.unauthorized())
                } 

                req.login(user, { session: false }, async function(error) {
                    if (error) {
                        next(error)
                    }

                    const apikey = await rolesService.getApyKey( {rolId: user.rol_id} )

                    if (!apikey) {
                        next(boom.unauthorized())
                    }

                    const scopes = await rolScopesService.getScopesByRol({ rolId: user.rol_id })

                    const { user_id, username, email, rol_id } = user

                    const payload = {
                        sub: user_id,
                        username,
                        email,
                        scopes: scopes
                    }

                    const token = jwt.sign(payload, config.authJwtSecret, {
                        expiresIn: '15m'
                    })

                    return res.status(200).json({ token, user: { user_id, username, email, rol_id, scopes }})

                })
            } catch (e) {
                next(error)
            }
        })(req, res, next)
    })

    router.post('/sign-up', validationHandler(createUserSchema), async function(req, res, next) {
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
}

module.exports = authApi
