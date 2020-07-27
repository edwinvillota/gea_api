const Joi = require('@hapi/joi')

const submoduleId = Joi.number().required()

const submoduleIdSchema = Joi.object({
    submoduleId: Joi.number().required()
})

const createSubmoduleSchema = Joi.object({
    name: Joi.string().min(3).max(20),
    route: Joi.string().min(3).max(50),
    icon: Joi.string().min(3).max(30),
    module_id: Joi.number().required(),
    auth_scope: Joi.string().regex(/^[a-z]{3,25}:[a-z]{3,10}(_){0,1}[a-z]{0,10}$/),
})

module.exports = {
    submoduleId,
    submoduleIdSchema,
    createSubmoduleSchema
}