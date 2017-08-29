var fs = require('fs')
const input = fs.createReadStream('./words/words.txt')

function readLines(input, array) {
  let remaining = ''
  return new Promise(function(resolve, reject) {
    input.on('data', function(data) {
      remaining += data
      let index = remaining.indexOf('\n')
      let last = 0
      while (index > -1) {
        let line = remaining.substring(last, index)
        if (line.length > 3) array.push({ word: line})
        last = index + 1
        index = remaining.indexOf('\n', last)
      }
      remaining = remaining.substring(last)
    })

    input.on('end', function() {
      if (remaining.length > 3) {
        array.push({word: remaining})
      }
      resolve(array)
    })
  })
}

module.exports = { readLines }
