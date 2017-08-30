const { expect } = require('chai')

const Node = require(process.cwd() + '/src/node')
const TST = require(process.cwd() + '/src/tst')
const Pattern = require(process.cwd() + '/src/pattern')

describe("TST", function() {

  describe("inserting patterns", function() {

    function People() { return { title: "People" } }
    function Person(id) { return { title: "Person", id } }
    function Person2(id) { return { title: "Person", id } }
    function Person3(id) { return { title: "Person", id } }
    function Person4(id) { return { title: "Person", id } }
    function Person5(id) { return { title: "Person", id } }
    function Hero() { return { title: "Hero" } }

    let tst

    before(() => {
      tst = new Pattern({ key: "url" })
    })

    describe("inserting without pattern", function() {

      before(() => tst.insertPattern({ url: "/people", component: People }))

      it("inserts the normal way", function() {
        expect(tst.root.char).to.equal("/")
        expect(tst.root.middle.char).to.equal("p")
        expect(tst.root.middle.middle.char).to.equal("e")
        expect(tst.root.middle.middle.middle.char).to.equal("o")
        expect(tst.root.middle.middle.middle.middle.char).to.equal("p")
        expect(tst.root.middle.middle.middle.middle.middle.char).to.equal("l")
        expect(tst.root.middle.middle.middle.middle.middle.middle.char).to.equal("e")
        expect(tst.root.middle.middle.middle.middle.middle.middle.value).to.eql({ url: "/people", component: People })
      })

    })

    describe("inserting with pattern suffix", function() {

      before(() => tst.insertPattern({ url: "/people/:id", component: Person }))

      it("inserts the normal way", function() {
        expect(tst.root.char).to.equal("/")
        expect(tst.root.middle.char).to.equal("p")
        expect(tst.root.middle.middle.char).to.equal("e")
        expect(tst.root.middle.middle.middle.char).to.equal("o")
        expect(tst.root.middle.middle.middle.middle.char).to.equal("p")
        expect(tst.root.middle.middle.middle.middle.middle.char).to.equal("l")
        expect(tst.root.middle.middle.middle.middle.middle.middle.char).to.equal("e")
        expect(tst.root.middle.middle.middle.middle.middle.middle.middle.char).to.equal("/")
        expect(tst.root.middle.middle.middle.middle.middle.middle.middle.middle.pattern).to.equal("id")
        expect(tst.root.middle.middle.middle.middle.middle.middle.middle.middle.value).to.eql(
          { url: "/people/:id", component: Person }
        )
      })

    })

    describe("inserting with pattern in the middle", function() {

      before(() => {
        tst.insertPattern({ url: "/people/:id/a", component: Person2 })
        tst.insertPattern({ url: "/people/:id/b", component: Person3 })
        tst.insertPattern({ url: "/people/:id/1", component: Person4 })
        tst.insertPattern({ url: "/people/:id/aa", component: Person5 })
      })

      it("inserts the normal way", function() {
        expect(tst.root.char).to.equal("/")
        expect(tst.root.middle.char).to.equal("p")
        expect(tst.root.middle.middle.char).to.equal("e")
        expect(tst.root.middle.middle.middle.char).to.equal("o")
        expect(tst.root.middle.middle.middle.middle.char).to.equal("p")
        expect(tst.root.middle.middle.middle.middle.middle.char).to.equal("l")
        expect(tst.root.middle.middle.middle.middle.middle.middle.char).to.equal("e")
        expect(tst.root.middle.middle.middle.middle.middle.middle.middle.char).to.equal("/")
        expect(tst.root.middle.middle.middle.middle.middle.middle.middle.middle.pattern).to.equal("id")
        expect(tst.root.middle.middle.middle.middle.middle.middle.middle.middle.value).to.eql(
          { url: "/people/:id", component: Person }
        )
        expect(tst.root.middle.middle.middle.middle.middle.middle.middle.middle.middle.char).to.equal("/")
        expect(tst.root.middle.middle.middle.middle.middle.middle.middle.middle.middle.middle.char).to.equal("a")
        expect(tst.root.middle.middle.middle.middle.middle.middle.middle.middle.middle.middle.value).to.eql(
          { url: "/people/:id/a", component: Person2 }
        )
        expect(tst.root.middle.middle.middle.middle.middle.middle.middle.middle.middle.middle.right.char).to.equal("b")
        expect(tst.root.middle.middle.middle.middle.middle.middle.middle.middle.middle.middle.right.value).to.eql(
          { url: "/people/:id/b", component: Person3 }
        )
        expect(tst.root.middle.middle.middle.middle.middle.middle.middle.middle.middle.middle.left.char).to.equal("1")
        expect(tst.root.middle.middle.middle.middle.middle.middle.middle.middle.middle.middle.left.value).to.eql(
          { url: "/people/:id/1", component: Person4 }
        )
        expect(tst.root.middle.middle.middle.middle.middle.middle.middle.middle.middle.middle.middle.char).to.equal("a")
        expect(tst.root.middle.middle.middle.middle.middle.middle.middle.middle.middle.middle.middle.value).to.eql(
          { url: "/people/:id/aa", component: Person5 }
        )
      })

    })

    describe('matching zero or one patterns', function() {

      it("matches the people component", function() {
        const { value } = tst.patternMatch("/people")
        expect(value.component).to.equal(People)
      })

      it("matches the person component", function() {
        const { value, matches } = tst.patternMatch("/people/23")
        expect(value).to.eql({ url: "/people/:id", component: Person })
        expect(matches.id).to.equal("23")
      })

      it("matches the person2 component", function() {
        const { value, matches } = tst.patternMatch("/people/23/a")
        expect(value).to.eql({ url: "/people/:id/a", component: Person2 })
        expect(matches.id).to.equal("23")
      })

      it("matches the person3 component", function() {
        const { value, matches } = tst.patternMatch("/people/23/b")
        expect(value).to.eql({ url: "/people/:id/b", component: Person3 })
        expect(matches.id).to.equal("23")
      })

      it("matches the person4 component", function() {
        const { value, matches } = tst.patternMatch("/people/23fsdf1213/1")
        expect(value).to.eql({ url: "/people/:id/1", component: Person4 })
        expect(matches.id).to.equal("23fsdf1213")
      })

      it("matches the person5 component", function() {
        const { value, matches } = tst.patternMatch("/people/jonatha-12.b/aa")
        expect(value).to.eql({ url: "/people/:id/aa", component: Person5 })
        expect(matches.id).to.equal("jonatha-12.b")
      })

    })

    describe('matching two patterns', function() {

        before(() => tst.insertPattern({ url: "/hero/:name/cool/:id/nice", component: Hero }))

        it("matches the hero component", function() {
          const { value, matches } = tst.patternMatch("/hero/bond/cool/007/nice")
          expect(value).to.eql({ url: "/hero/:name/cool/:id/nice", component: Hero })
          expect(matches).to.eql({
            name: "bond",
            id: "007"
          })
        })


    })

  })

})
