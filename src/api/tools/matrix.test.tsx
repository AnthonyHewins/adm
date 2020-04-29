import {Matrix} from './matrix'

describe('constructor', () => {
    it('handles the base case', () => {
        expect(() => new Matrix([[]])).not.toThrow()
    })

    it('throws errors when dimensions dont match', () => {
        const data = [[1,2], [1,2,3]]
        const expError = new Error(`given data has mismatched dimensions at index 1 (expecting 2): 1,2,3`)

        expect(() => new Matrix(data)).toThrow(expError)
    })
})

describe('mat', () => {
    it('returns underlying matrix', () => {
        expect(new Matrix([[]]).mat).toEqual([[]])
    })
})

describe('dim', () => {
    it('returns dimensions', () => {
        expect(new Matrix([[]]).dim).toBe(0)
    })
})

describe('length', () => {
    it('returns length', () => {
        expect(new Matrix([[], []]).length).toBe(2)
    })
})

describe('toPlot', () => {
    const arrayTo26 = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26]
    const mapTo26 = {a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7, h: 8, i: 9, j: 10, k: 11, l: 12, m: 13, n: 14, o: 15, p: 16, q: 17, r: 18, s: 19, t: 20, u: 21, v: 22, w: 23, x: 24, y: 25, z: 26}

    it('handles the base case', () => {
        expect(new Matrix([[]]).toPlot()).toEqual([{}])
    })

    it('picks reasonable defaults on no axes given, up to 26 (the alphabet)', () => {
        const m = new Matrix([ arrayTo26 ]).toPlot()
        const map = [ mapTo26 ]

        expect(m).toEqual(map)
    })

    it('errors if the dimension is too large with no given axes, ie its more than the alphabet can cover', () => {
        const tooBig = new Matrix([ arrayTo26.concat(27) ])
        const expError = new Error("supplied empty axes to Matrix.toPlot, so tried reasonable defaults, but the reasonable defaults aren't long enough")

        expect(() => tooBig.toPlot()).toThrow(expError)
    })

    it('if the axes are less than dim, it only takes what it needs', () => {
        const m = new Matrix([[1,2,3,4,5,6], [1,2,3,4,5,6]]).toPlot('xyz'.split(''))
        const map = [{x: 1, y: 2, z: 3}, {x: 1, y: 2, z: 3}]

        expect(m).toEqual(map)
    })
})
