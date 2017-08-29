const { expect } = require('chai')

const Node = require(process.cwd() + '/src/node')
const TST = require(process.cwd() + '/src/tst')

const paul = { name: 'Paul' }
const pauline = { name: 'Pauline' }


describe('TST', function() {

  let tst = new TST({ key: "name" })

  describe("inserting Paul", function() {

    before(() => tst.insert(paul))

    it("is at the root", function() {
      expect(tst.root.char).to.equal("P")
      expect(tst.root.middle.char).to.equal("a")
      expect(tst.root.middle.middle.char).to.equal("u")
      expect(tst.root.middle.middle.middle.char).to.equal("l")
      expect(tst.root.middle.middle.middle.value).to.equal(paul)
    })

    describe("getting Paul", function() {

      it("returns paul", function() {
        expect(tst.get("Paul")).to.equal(paul)
      })

    })

  })

  describe('inserting Pauline', function() {

    before(() => {
      tst.insert(pauline)
    })

    it("is at the root", function() {
      expect(tst.root.char).to.equal("P")
      expect(tst.root.middle.char).to.equal("a")
      expect(tst.root.middle.middle.char).to.equal("u")
      expect(tst.root.middle.middle.middle.char).to.equal("l")
      expect(tst.root.middle.middle.middle.middle.char).to.equal("i")
      expect(tst.root.middle.middle.middle.middle.middle.char).to.equal("n")
      expect(tst.root.middle.middle.middle.middle.middle.middle.char).to.equal("e")
      expect(tst.root.middle.middle.middle.middle.middle.middle.value).to.equal(pauline)
    })

    describe("getting Paul", function() {

      it("returns paul", function() {
        expect(tst.get("Paul")).to.equal(paul)
      })

    })

    describe("getting Pauline", function() {

      it("returns pauline", function() {
        expect(tst.get("Pauline")).to.equal(pauline)
      })

    })

  })

  describe('errors', function() {

    describe('creating TST with bad/empty properties', function() {

      it('throws an error if object is not passed to TST', function () {
        expect(() => new TST("hello")).to.throw('Properties must be an object and must have a key called "key" which contains a string only')
      })

      it('throws an error if an empty object is passed to TST', function () {
        expect(() => new TST({})).to.throw('Properties must be an object and must have a key called "key" which contains a string only')
      })

      it('throws an error if object does not have a key called "key"', function () {
        expect(() => new TST({ test: "Paul"})).to.throw('Properties must be an object and must have a key called "key" which contains a string only')
      })

      it('throws an error if object key is not a string', function () {
        expect(() => new TST({ key: 50})).to.throw('Properties must be an object and must have a key called "key" which contains a string only')
      })

    })

    describe('trying to insert bad data', function() {

      it('throws an error when trying to insert with wrong key', function () {
        expect(() => tst.insert({ person: "Paul" })).to.throw('The object you are trying to insert does not contain the proper key')
      })

    })


  })

})
