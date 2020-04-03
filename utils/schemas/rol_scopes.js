const Joi = require('@hapi/joi')

// Validation Schemas
const { rolId } = require('./rol')
const { scopeId } = require('./scope')

const rolScopesIdSchema = Joi.object({
    id: Joi.number().required()
})

const createRolScopeSchema = Joi.object({
    rolId: rolId,
    scopeId: scopeId 
})

module.exports = {
    rolScopesIdSchema,
    createRolScopeSchema
}