import React from 'react'
import * as core from './core'
import {Message} from 'semantic-ui-react'

describe('AppAffirmative', () => {
    describe('toMessage', () => {
        it('converts to a proper success message', () => {
            const h = "Success"
            const m = "usnfguids"

            const err = <Message success header={h} message={m} />

            const resp = new core.AppAffirmative(m)

            expect(resp.toMessage()).toEqual(err)
        })
    })
})

describe("AppError", () => {
    describe('toMessage', () => {
        it('converts to a proper error message', () => {
            const h = "randomcode"
            const m = "usnfguids"

            const err = <Message negative header={"Error: " + h} message={m} />

            const resp = new core.AppError(h, m)

            expect(resp.toMessage()).toEqual(err)
        })
    })
})
