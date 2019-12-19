const createValidator = (predicate, error) => {
    if (typeof predicate !== 'function') {
        throw new Error('Invalid predicate!')
    }
    let e
    switch (typeof error) {
        case 'function':
            e = error()
            break
        case 'object':
            e = error
            break
        case 'string':
            e = new Error(error)
            break
        default:
            e = new Error('Validation failed!')
            break
    }
    return object => {
        if (!predicate(object)) {
            throw e
        }
        return object
    }
}

module.exports = {
    createValidator
}
