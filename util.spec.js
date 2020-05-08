const { expect } = require('chai')
const { replaceRefs, replaceRange } = require('./util')
const { references: refs} = require('./references')

describe('replaceRange', () => {
    it('should replace simple ranges', () => {
        const txt = '1–3'
        const expected = '1,2,3'
        const actual = replaceRange(txt)
        expect(actual).to.be.equal(expected)
    })

    it('should replace consecutive ranges', () => {
        const txt = '1–3,5–7'
        const expected = '1,2,3,5,6,7'
        const actual = replaceRange(txt)
        expect(actual).to.be.equal(expected)
    })

    it('shouldn\'t replace non-ranges', () => {
        const txt = '1,3–5,7,12,15–19,21'
        const expected = '1,3,4,5,7,12,15,16,17,18,19,21'
        const actual = replaceRange(txt)
        expect(actual).to.be.eql(expected)
    })
})

describe('replaceRefs', () => {
    it('should replace a single reference', () => {
        const txt = 'composé de [23] : l’aorte'
        const expected = `composé de \\cite{${refs[23]}} : l’aorte`
        const actual = replaceRefs(txt)
        expect(actual).to.be.equal(expected)
    })

    it('should replace a multiple references reference', () => {
        const txt = 'l’anévrisme évolutif[4,8], sa dissection'
        const expected = `l’anévrisme évolutif\\cite{${refs[4]}, ${refs[8]}}, sa dissection`
        const actual = replaceRefs(txt)
        expect(actual).to.be.equal(expected)
    })

    it('should replace ranges', () => {
        const txt = 'œsophagiennes[6–8]. Cette'
        const expected = `œsophagiennes\\cite{${refs[6]}, ${refs[7]}, ${refs[8]}}. Cette`
        const actual = replaceRefs(txt)
        expect(actual).to.be.equal(expected)
    })

    it('should replace ranges mixed with single refs', () => {
        const txt = 'œsophagiennes[1,6–8,10,12–14,16]. Cette'
        const expected = `œsophagiennes\\cite{${refs[1]}, ${refs[6]}, ${refs[7]}, ${refs[8]}, ${refs[10]}, ${refs[12]}, ${refs[13]}, ${refs[14]}, ${refs[16]}}. Cette`
        const actual = replaceRefs(txt)
        expect(actual).to.be.equal(expected)
    })
})
