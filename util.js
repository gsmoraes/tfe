const { references } = require('./references')

function replaceRange(text) {
    return text.replace(/(\d+)–(\d+)/gm, (_, min, max) => {
        return range(+min, +max)
    })
}

function range(start, end) {
    const ans = []
    for (let i = start; i <= end; i++) {
        ans.push(i)
    }
    return ans
}

function replaceRefs(text, field = '') {
    return text.replace(/\[(.+?)\]/gm, (_, capture) => {
        const trimmed = capture.replace(/' '/gm, '')
        const refNums = trimmed.split(',')
        const refNums2 = refNums.map(r => replaceRange(r))
        const refNums3 = refNums2.join(',').split(',').map(r => +r)
        const refNames = refNums3.map(r => references[+r]).join(', ')
        return `\\cite${field}{${refNames}}`
    })
}

module.exports = {
    replaceRefs,
    replaceRange,
    range
}