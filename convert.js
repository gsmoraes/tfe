const fs = require('fs')
const path = require('path')
const { references } = require('./references')
const { replaceRefs } = require('./util')
const [_, __, dir] = process.argv

const files = fs.readdirSync(dir).filter(f => path.extname(f) === '.tex')

files.forEach(f => {
    f = `${dir}/${f}`
    const read = fs.createReadStream(f)
    const write = fs.createWriteStream(`${f}.bak`)
    read.pipe(write)

    const text = fs.readFileSync(f, 'utf8')
    const citations = replaceRefs(text, 'author')

    fs.writeFileSync(`./${f}`, citations)
})
