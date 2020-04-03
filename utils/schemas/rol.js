const Joi = require('@hapi/joi')

const rolId = Joi.string().regex(/[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}/).required()

const rolIdSchema = Joi.object({
    rolId: Joi.string().regex(/[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}/).required()
})

const createRolSchema = Joi.object({
    name: Joi.string().min(4).max(30).required(),
    description: Joi.string().min(4).max(255).required()
})

module.exports = {
    rolId,
    rolIdSchema,
    createRolSchema
}
