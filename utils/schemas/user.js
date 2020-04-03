const Joi = require('@hapi/joi')

const userId = Joi.string().regex(/[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}/).required()

const userIdSchema = Joi.object({
    userId: Joi.string().regex(/[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}/).required()
})

const userNameSchema = Joi.object({
    username: Joi.string().max(30).min(6).required()
})

const createUserSchema = Joi.object({
    username: Joi.string().max(30).min(6).required(),
    name: Joi.string().max(30).min(3).required(),
    lastname: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    job_title_id: Joi.number().required(),
    rol_id: Joi.string().required()
})

module.exports = {
    userId,
    userIdSchema,
    userNameSchema,
    createUserSchema
}