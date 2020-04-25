const Joi = require('@hapi/joi');

// Validation schemas
const { rolId } = require('./rol');
const { moduleIdSchema } = require('./modules');

const rolModuleId = Joi.number();

const createRolModuleSchema = Joi.object({
    rolId: rolId,
    moduleId: moduleIdSchema
})

module.exports = {
    rolModuleId,
    createRolModuleSchema
}

