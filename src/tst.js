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

  // xinsert(obj) {
  //   // check that the object has the correct key
  //   if (!obj.hasOwnProperty(this.properties.key)) { throw new Error('The object you are trying to insert does not contain the proper key') }

  //   this.root = insertNode(this.root, obj[this.properties.key], obj, 0)

  //   function insertNode(current, key, value, depth) {
  //     if (current === undefined) {
  //       if (key.length - 1 === depth) {
  //         return new Node(key, value, depth)
  //       }
  //       current = new Node(key, undefined, depth)
  //     }
  //     let c = key[depth]
  //     if (c < current.char) {
  //       current.left = insertNode(current.left, key, value, depth)
  //       return current
  //     }
  //     if (c > current.char) {
  //       current.right = insertNode(current.right, key, value, depth)
  //       return current
  //     }
  //     if (depth < key.length - 1) {
  //       current.middle = insertNode(current.middle, key, value, depth + 1)
  //       return current
  //     }
  //     current.value = value
  //     return current
  //   }

  // }

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

  insertPattern(obj) {
    this.root = insertFn(this.root, obj[this.properties.key], obj, 0)

    function insertFn(current, key, value, depth) {
      let c = key[depth]

      if (current === undefined) {
        if (key.length - 1 === depth) {
          return new Node(key, value, depth)
        }

        if (c === ":") {
          let pattern = ""
          depth++
          while(c = key[depth]) {
            if (c === "/") break
            pattern = pattern + c
            depth++
          }
          if (c === undefined) {
            return new Node(key, value, depth, pattern)
          }
          current = new Node(key, undefined, depth, pattern)
          current.middle = insertFn(current.middle, key, value, depth)
          return current
        }

        current = new Node(key, undefined, depth)
      }

      if (current.pattern) {
        if (c === ":") {
          let pattern = ""
          depth++
          while(c = key[depth]) {
            if (c === "/") { break }
            pattern = pattern + c
            depth++
          }
          if (c === undefined) {
            if (pattern !== current.pattern) throw new Error("pattern name conflict")
            current.value = value
            return current
          }
          if (pattern !== current.pattern) throw new Error("pattern name conflict")
          current.middle = insertFn(current.middle, key, value, depth)
          return current
        }
      }
      if (c < current.char) {
        current.left = insertFn(current.left, key, value, depth)
        return current
      }
      if (c > current.char) {
        current.right = insertFn(current.right, key, value, depth)
        return current
      }
      if (depth < key.length - 1) {
        current.middle = insertFn(current.middle, key, value, depth + 1)
        return current
      }
      current.value = value
      return current
    }
  }

  get(key) {
    const n = getNode(this.root, key, 0)
    if (n !== undefined) return n.value
  }

  patternMatch(key) {
    try {
      return matchPattern(this.root, key, {})
    } catch (e) { return {} }

    function matchPattern(current, key, matches) {
      if (current === undefined) return {}
      let c = key[0]
      if (current.pattern) {
        let match = ""
        while (c = key[0]) {
          if (c === "/") break
          match = match + c
          key = key.slice(1)
        }
        if (match.length === 0) throw new Error("bad match")
        matches[current.pattern] = match
        if (c === undefined) { return { value: current.value, matches } }
        current = current.middle.middle
        key = key.slice(1)
        c = key[0]
      }

      if (c < current.char) return matchPattern(current.left, key, matches)
      if (c > current.char) return matchPattern(current.right, key, matches)
      if (key.length > 0) {
        if (key.length === 1 && current.value) {
          return { value: current.value, matches }
        }
        return matchPattern(current.middle, key.slice(1), matches)
      }
    }
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

// function xgetNode(current, key, depth) {
//   if (current === undefined) return
//   const c = key[depth]
//   if (c < current.char) return getNode(current.left, key, depth)
//   if (c > current.char) return getNode(current.right, key, depth)
//   if (depth < key.length - 1) return getNode(current.middle, key, depth + 1)
//   return current
// }

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
