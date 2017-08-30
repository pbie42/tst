const Node = require(process.cwd() + '/src/node')
const TST = require(process.cwd() + '/src/tst')

const tst = new TST({ key: "name" })

const paul = { name: 'Paul' }
const pauline = { name: 'Pauline' }
const patrick = { name: 'Patrick' }

tst.insert(paul)
console.log(`\n`)
console.log(`\n`)
tst.insert(pauline)
console.log(`\n`)
console.log(`\n`)
tst.insert(patrick)
console.log(`\n`)
console.log(`\n`)