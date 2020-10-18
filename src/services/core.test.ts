import apiCall, { getRequest, postRequest, checkResponse} from 'services/core'

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

    it('errors out with response message if code is not success', () => {
        expect(() => checkResponse({code: 'failure', message: 'asd'})).toThrow('asd')
    })

    it('succeeds if response code is success', () => {
        expect(() => checkResponse({code: 'success', message: 'asd'})).not.toThrow()
    })
})
