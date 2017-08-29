const { expect } = require('chai')

const Node = require(process.cwd() + '/src/node')
const TST = require(process.cwd() + '/src/tst')

const con = { name: 'con' }
const container = { name: 'container' }
const condition = { name: 'condition' }
const contamination = { name: 'contamination' }
const constant = { name: 'constant' }
const constructors = { name: 'constructors' }
const conditioner = { name: 'conditioner' }
const constable = { name: 'constable' }
const congregation = { name: 'congregation' }
const congratulations = { name: 'congratulations' }

describe('TST', function() {

  let tst = new TST({ key: "name" })

  before(() => {
    tst.insert(con)
    tst.insert(container)
    tst.insert(condition)
    tst.insert(contamination)
    tst.insert(constant)
    tst.insert(constructors)
    tst.insert(conditioner)
    tst.insert(constable)
    tst.insert(congregation)
    tst.insert(congratulations)
  })

  describe('findByPrefix', function() {

    describe('finds by "con"', function() {


      it('returns all items in TST', function () {
        found = tst.findByPrefix('con')
        expect(found).to.eql([con, condition, conditioner, congratulations, congregation, constable, constant, constructors, container, contamination ])

      })

    })

  })

})
