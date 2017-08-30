const TST = require('./tst.js')
const Node = require('./node')

const { isObjEmpty, hasProperty } = require('./utils')

class Pattern extends TST {

  constructor(properties) {
    super(properties)
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
}

module.exports = Pattern