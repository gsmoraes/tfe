const { references } = require('./references')

function replaceRange(text) {
    return text.replace(/(\d+)–(\d+)/gm, (_, min, max) => {
        return range(+min, +max)
    })
}

function range(start, end) {
    var ans = [];
    for (let i = start; i <= end; i++) {
        ans.push(i);
    }
    return ans;
}

function replaceRefs(text) {
    return text.replace(/\[(.+?)\]/gm, (_, capture) => {
        var trimmed = capture.replace(/' '/gm, '')
        var refNums = trimmed.split(',')
        var refNums2 = refNums.map(r => replaceRange(r))
        var refNums3 = refNums2.join(',').split(',').map(r => +r)
        var refNames = refNums3.map(r => references[+r]).join(', ')
        return `\\cite{${refNames}}`
    });
}

module.exports = {
    replaceRefs,
    replaceRange,
    range
}