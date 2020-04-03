const General = require('./general')

class ModuleValidator {
    static validate (name, route, icon, description) {
        const errors = []
        if (General.isEmpty(name)) errors.push({prop: 'name', error: 'IsEmpty'})
        if (General.isEmpty(route)) errors.push({prop: 'route', error: 'IsEmpty'})
        if (General.isEmpty(icon)) errors.push({prop: 'icon', error: 'IsEmpty'})
        if (General.isEmpty(description)) errors.push({prop: 'description', error: 'IsEmpty'})

        if (errors.length > 0) {
            return {
                isValid: false,
                errors: errors
            }
        } else {
            return {
                isValid: true
            }
        }
    }
}

module.exports = ModuleValidator