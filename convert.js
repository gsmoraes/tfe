var fs = require('fs')
var path = require('path')
var { references } = require('./references')
const { replaceRefs } = require('./util')

var files = fs.readdirSync('.').filter(f => path.extname(f) === '.tex')

files.forEach(f => {
    // fs.createReadStream(f).pipe(fs.createWriteStream(`${f}.bak`));

    var text = fs.readFileSync(f, 'utf8')
    var citations = replaceRefs(text)

    fs.writeFileSync(`./_${f}`, citations)
})
