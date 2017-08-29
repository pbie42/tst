const { expect } = require('chai')
const fs = require('fs');
const input = fs.createReadStream('./words/words.txt');

const Node = require(process.cwd() + '/src/node')
const TST = require(process.cwd() + '/src/tst')
const { readLines } = require(process.cwd() + '/src/read_words')

describe('TST', function() {
  let tst = new TST({ key: "word" }), aban, ab
  const words = []

  before(() => readLines(input, words))

  describe('inserting 300K+ words', function() {

    it('can process all words', function () {
      words.forEach(word => tst.insert(word))
      aban = tst.findByPrefix('aban')
      expect(aban.length).to.equal(16)
    })

    it('limits findByPrefix return by 20 max', function () {
      words.forEach(word => tst.insert(word))
      ab = tst.findByPrefix('ab')
      expect(ab.length).to.equal(20)
    })

  })
})
