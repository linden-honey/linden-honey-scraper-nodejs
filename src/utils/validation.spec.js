const { describe, it } = require('mocha')
const { expect, assert } = require('chai')

const { createValidator } = require('./validation')

describe('Validation module', () => {
    describe('#createValidator(predicate, error?)', () => {
        it('Should return object', () => {
            const predicate = () => true
            const validator = createValidator(predicate)
            expect(validator).to.exist
            const input = {}
            const result = validator(input)
            expect(result).equals(input)
        })
        it('Should return validator with default error', () => {
            const predicate = () => false
            const validator = createValidator(predicate)
            expect(validator).to.exist
            assert.throws(() => validator({}), 'Validation failed!')
        })
        describe('Should return validator with custom error', () => {
            it('pass error supplier', () => {
                const predicate = () => false
                const errorMessage = 'ERROR'
                const validator = createValidator(predicate, () => new Error(errorMessage))
                expect(validator).to.exist
                assert.throws(() => validator({}), errorMessage)
            })
            it('pass message', () => {
                const predicate = () => false
                const errorMessage = 'ERROR'
                const validator = createValidator(predicate, errorMessage)
                expect(validator).to.exist
                assert.throws(() => validator({}), errorMessage)
            })
            it('pass error object', () => {
                const predicate = () => false
                const errorMessage = 'ERROR'
                const validator = createValidator(predicate, new Error(errorMessage))
                expect(validator).to.exist
                assert.throws(() => validator({}), errorMessage)
            })
        })
        it('Should throw an Error - invalid predicate', () => {
            assert.throws(() => createValidator(), 'Invalid predicate!')
        })
    })
})
