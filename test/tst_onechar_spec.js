const { expect } = require('chai')

const Node = require(process.cwd() + '/src/node')
const TST = require(process.cwd() + '/src/tst')

const paul = { name: 'Paul' }
const one = { name: '1' }
const a = { name: 'a' }
const aa = { name: 'a', value: "high" }
const b = { name: 'b' }
const c = { name: 'c' }
const d = { name: 'd' }

describe('TST', function() {

  describe('empty', function() {

    let tst

    before(function () {
      tst = new TST({ key: 'name' })
    })

    it('has a root', function () {
      expect(tst.hasOwnProperty('root')).to.be.true
      expect(tst.root).to.be.undefined
    })

    it('has properties', function () {
      expect(tst.properties.key).to.equal('name')
    })

  })

  describe('insert', function() {

    describe('values with one character', function() {

      let tst

      before(function () {
        tst = new TST({ key: 'name' })
      })

      describe('inserting root', function() {

        before(() => tst.insert(a) )

        describe('updating root', function() {

          it('is a node', function () {
            expect(tst.root).to.be.instanceOf(Node)
          })

          it("has the correct char", function() {
            expect(tst.root.char).to.equal('a')
          })

          it("holds the value", function() {
            expect(tst.root.value).to.equal(a)
          })

        })

        describe("get", function() {

          describe("when the key exists", function() {

            it("returns the value", function() {
              expect(tst.get('a')).to.equal(a)
            })

          })

        })

      })

      describe("insert right", function() {

        before(() => tst.insert(b) )

        it("inserts a node on the right of the root", function() {
          const n = tst.root.right
          expect(n).to.be.instanceOf(Node)
          expect(n.char).to.equal("b")
          expect(n.value).to.equal(b)
        })

      })

      describe("inserting left", function() {

        before(() => tst.insert(one) )

        it("inserts a node on the right of the root", function() {
          const n = tst.root.left
          expect(n).to.be.instanceOf(Node)
          expect(n.char).to.equal("1")
          expect(n.value).to.equal(one)
        })

      })

      describe("replacing the root", function() {

        before(() => tst.insert(aa))

        it('inserts a new node in place of the previous', function () {
          const n = tst.root
          expect(n.char).to.equal('a')
          expect(n.value).to.equal(aa)
        })

      })

    })


  })


})
