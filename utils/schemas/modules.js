const Joi = require('@hapi/joi')

const moduleIdSchema = Joi.number()
const moduleNameSchema = Joi.string().max(30)
const moduleRouteSchema = Joi.string().regex(/^\/[a-z]*(\/[a-z]*){0,}$/).max(50)
const moduleIconSchema = Joi.string().max(50)
const moduleDescriptionSchema = Joi.string().min(10).max(150)

const createModuleSchema = Joi.object({
    name: moduleNameSchema.required(),
    route: moduleRouteSchema.required(),
    icon: moduleIconSchema.required(),
    description: moduleDescriptionSchema.required()
})

const updateModuleSchema = Joi.object({
    name: moduleNameSchema,
    route: moduleRouteSchema,
    icon: moduleIconSchema,
    description: moduleDescriptionSchema
})

module.exports = {
    moduleIdSchema,
    createModuleSchema,
    updateModuleSchema
}