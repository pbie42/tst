const { expect } = require('chai')

const Node = require(process.cwd() + '/src/node')
const TST = require(process.cwd() + '/src/tst')

const now = { name: 'now' }
const is = { name: 'is' }
const the = { name: 'the' }
const time = { name: 'time' }
const for1 = { name: 'for' }
const theory = { name: 'theory' }

describe('TST ', function() {

  let tst = new TST({ key: "name" })

  before(() => {
    tst.insert(now)
    tst.insert(is)
    tst.insert(the)
    tst.insert(time)
    tst.insert(for1)
    tst.insert(theory)
  })

  it('now is at the root', function () {
    expect(tst.root.char).to.equal('n')
    expect(tst.root.middle.char).to.equal('o')
    expect(tst.root.middle.middle.char).to.equal('w')
    expect(tst.root.middle.middle.value).to.equal(now)
  })

  it('is is to the left of the root', function () {
    expect(tst.root.left.char).to.equal('i')
    expect(tst.root.left.middle.char).to.equal('s')
    expect(tst.root.left.middle.value).to.equal(is)
  })

  it('the is to the right of the root', function () {
    expect(tst.root.right.char).to.equal('t')
    expect(tst.root.right.middle.char).to.equal('h')
    expect(tst.root.right.middle.middle.char).to.equal('e')
    expect(tst.root.right.middle.middle.value).to.equal(the)
  })

  it('time is to the right of the', function () {
    expect(tst.root.right.char).to.equal('t')
    expect(tst.root.right.middle.right.char).to.equal('i')
    expect(tst.root.right.middle.right.middle.char).to.equal('m')
    expect(tst.root.right.middle.right.middle.middle.char).to.equal('e')
    expect(tst.root.right.middle.right.middle.middle.value).to.equal(time)
  })

  it('for is to the left of is', function () {
    expect(tst.root.left.left.char).to.equal('f')
    expect(tst.root.left.left.middle.char).to.equal('o')
    expect(tst.root.left.left.middle.middle.char).to.equal('r')
    expect(tst.root.left.left.middle.middle.value).to.equal(for1)
  })

  it('theory is to the left of the', function () {
    expect(tst.root.right.char).to.equal('t')
    expect(tst.root.right.middle.char).to.equal('h')
    expect(tst.root.right.middle.middle.char).to.equal('e')
    expect(tst.root.right.middle.middle.middle.char).to.equal('o')
    expect(tst.root.right.middle.middle.middle.middle.char).to.equal('r')
    expect(tst.root.right.middle.middle.middle.middle.middle.char).to.equal('y')
    expect(tst.root.right.middle.middle.middle.middle.middle.value).to.equal(theory)
  })

})
