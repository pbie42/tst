const Node = require(process.cwd() + '/src/node')
const TST = require(process.cwd() + '/src/tst')

const paul = { name: 'Paul' }
const pauline = { name: 'Pauline' }

let tst = new TST({ key: "name" })



tst.insert(paul)
console.log(`\n`, )
console.log(`\n`, )
tst.insert({ name: 'Pauline' })
console.log(`\n`, )
console.log(`\n`, )
tst.insert({ name: 'Patrick' })
console.log(`\n`, )
console.log(`\n`, )
tst.insert({ name: 'Abe' })
console.log(`\n`, )
console.log(`\n`, )
tst.insert({ name: 'Ben' })
console.log(`\n`, )
console.log(`\n`, )
let test = tst.get("Ben")
console.log(`get!!!`, test)