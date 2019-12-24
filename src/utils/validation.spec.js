const { describe, it } = require('mocha')
const { expect, assert, use } = require('chai')
const { spy } = require('sinon')
const sinonChai = require('sinon-chai')

use(sinonChai)

const { createValidator } = require('./validation')

describe('Validation module', () => {
    describe('#createValidator(predicate, error?)', () => {
        describe('Validator creation', () => {
            it('Should return validator function', () => {
                const predicate = () => true
                const validator = createValidator(predicate)
                expect(validator)
                    .to.exist
                    .and
                    .to.be.a('function')
            })
            it('Should throw an Error - invalid predicate', () => {
                assert.throws(() => createValidator(), 'Invalid predicate!')
            })
        })
        describe('Validation logic', () => {
            it('Should pass validation', () => {
                const object = {}
                const predicate = spy(() => true)
                const validator = createValidator(predicate)
                validator(object)
                expect(predicate).to.be.calledOnceWith(object)
            })
            it('Should fail validation with default error', () => {
                const object = {}
                const predicate = spy(() => false)
                const validator = createValidator(predicate)
                assert.throws(() => validator(object), 'Validation failed!')
            })
            describe('Should fail validation custom error', () => {
                it('pass error supplier', () => {
                    const object = {}
                    const predicate = spy(() => false)
                    const errorMessage = 'ERROR'
                    const validator = createValidator(predicate, () => new Error(errorMessage))
                    assert.throws(() => validator(object), errorMessage)
                    expect(predicate).to.be.calledOnceWith(object)
                })
                it('pass message', () => {
                    const object = {}
                    const predicate = spy(() => false)
                    const errorMessage = 'ERROR'
                    const validator = createValidator(predicate, errorMessage)
                    assert.throws(() => validator(object), errorMessage)
                    expect(predicate).to.be.calledOnceWith(object)
                })
                it('pass error object', () => {
                    const object = {}
                    const predicate = spy(() => false)
                    const errorMessage = 'ERROR'
                    const validator = createValidator(predicate, new Error(errorMessage))
                    assert.throws(() => validator(object), errorMessage)
                    expect(predicate).to.be.calledOnceWith(object)
                })
            })
        })
    })
})
