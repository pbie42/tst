const Node = require('./node')

const { isObjEmpty, hasProperty } = require('./utils')

class TST {

  constructor(properties) {
    // expect properties to be an object
    // expect properties to have a key key
    // expect the key to be a string
    if (isObjEmpty(properties)) { throw new Error('Properties must be an object and must have a key called "key" which contains a string only') }
    this.root = undefined
    this.properties = properties
  }

  insert(obj) {
    if (!obj.hasOwnProperty(this.properties.key)) { throw new Error('The object you are trying to insert does not contain the proper key') }

    let current = this.root
    let key = obj[this.properties.key]
    let value = obj
    let depth = 0
    let unset = true

    if (current === undefined) {
      if (key.length - 1 === depth) {
        this.root = new Node(key, value, depth)
      }
      this.root = new Node(key, undefined, depth)
    }
    current = this.root

    while (unset) {
      let c = key[depth]
      if (c < current.char) {
        if (!current.left) current.left = new Node(key, undefined, depth)
        current = current.left
        continue
      }
      if (c > current.char) {
        if (!current.right) current.right = new Node(key, undefined, depth)
        current = current.right
        continue
      }
      if (depth < key.length - 1) {
        if (current.middle) ++depth
        else current.middle = new Node(key, undefined, ++depth)
        current = current.middle
        continue
      }
      unset = false
      current.value = value
    }
  }

  get(key) {
    const n = getNode(this.root, key, 0)
    if (n !== undefined) return n.value
  }

  findByPrefix(prefix) {

    const startNode = getNode(this.root, prefix, 0)
    if (startNode === undefined) return []
    const result = []

    findRelated(startNode, result, prefix, this.properties.key)
    return result

    function findRelated(current, stash, prefix, key) {
      if (stash.length >= 20) return
      if (current === undefined) return
      if (current.value && current.value[key].includes(prefix)) stash.push(current.value)
      findRelated(current.left, stash, prefix, key)
      findRelated(current.middle, stash, prefix, key)
      findRelated(current.right, stash, prefix, key)
    }

  }

}

function getNode(current, key, depth) {
  if (current === undefined) return
  let c = key[depth]
  let unfound = true
  while (unfound) {
    c = key[depth]
    if (current && c < current.char){
      if (current.value && current.value === key) return current
      current = current.left
      continue
    }
    if (current && c > current.char){
      if (current.value && current.value === key) return current
      current = current.right
      continue
    }
    if (current && depth < key.length -1) {
      if (current.value && current.value === key) return current
      current = current.middle
      depth++
      continue
    }
    unfound = false
    return current
  }
}

module.exports = TST
