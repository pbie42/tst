class Node {
  constructor(key, value, depth, pattern) {
    if (pattern) {
      this.char = undefined
      this.pattern = pattern
    } else {
      this.char = key[depth]
      this.pattern = undefined
    }
    this.value = value
    this.left = undefined
    this.middle = undefined
    this.right = undefined
  }
}

module.exports = Node
