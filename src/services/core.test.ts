import {apiCall, getRequest, postRequest, checkResponse} from 'services/core'

describe('apiCall', () => {
})

describe('getRequest', () => {

})

describe('postRequest', () => {
})

describe('checkResponse', () => {
        it(`throws if code is missing`, () => {
            expect(() => checkResponse({message: 'asdasd'})).toThrow('response is missing required field code')
        })

        it(`throws if message is missing`, () => {
            expect(() => checkResponse({code: 'asdasd'})).toThrow('response is missing required field message')
        })

    it('succeeds if message and code are present', () => {
        expect(() => checkResponse({code: 'asd', message: 'asd'})).not.toThrow('')
    })
})
