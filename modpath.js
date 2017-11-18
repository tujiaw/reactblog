var fs = require('fs')
var path = require('path')

const dir = '/' + path.basename(__dirname)
const indexPath = './build/index.html'
let html = fs.readFileSync(indexPath, 'utf8')

const regList = [
  /\/favicon\.ico/,
  /\/manifest\.json/,
  /\/css\/font\.css/,
  /\/static\/js\/main\..*\.js/,
  /\/static\/css\/main\..*\.css/,
  /\/fonticon.css/,
  /\/github.css/,
  /\/github-markdown.min.css/,
]

for (const reg of regList) {
  const result = html.match(reg)
  if (result && result.length) {
    html = html.replace(result[0], dir + result[0])
  }
}

console.log(html)
fs.writeFileSync(indexPath, html)


