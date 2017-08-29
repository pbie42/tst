const { expect } = require('chai')
const Node = require(process.cwd() + '/src/node')

describe('Node', function() {

  describe('construction', function() {

    let node

    before(function () {
      node = new Node("a", { name: "a" }, 0)
    })

    it('has a character', function () {
      expect(node.char).to.equal('a')
    })

    it('has a value', function () {
      expect(node.hasOwnProperty('value')).to.be.true
      expect(node.value).to.eql({ name: "a" })
    })

    it('has a left', function () {
      expect(node.hasOwnProperty('left')).to.be.true
      expect(node.left).to.be.undefined
    })

    it('has a middle', function () {
      expect(node.hasOwnProperty('middle')).to.be.true
      expect(node.middle).to.be.undefined
    })

    it('has a right', function () {
      expect(node.hasOwnProperty('right')).to.be.true
      expect(node.right).to.be.undefined
    })

  })

})
