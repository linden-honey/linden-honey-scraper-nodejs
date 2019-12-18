const createValidator = (validationPredicate, errorSupplier) => object => {
    if(!validationPredicate(object)) {
        const error = typeof errorSupplier === 'function' ? errorSupplier() : new Error("Validation failed")
        throw error
    }
    return object
}

module.exports = {
    createValidator
}
