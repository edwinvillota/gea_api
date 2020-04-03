class GeneralValidations {
    static isEmpty (value) {
        if (typeof value !== undefined && value !== null) {
            if (value.trim().length > 0) {
                return false
            } else {
                console.log(value)
                return true
            }
        } else {
            return true
        }
    }
}

module.exports = GeneralValidations