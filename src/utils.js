const hasProperty = Object.prototype.hasOwnProperty

function isObjEmpty(obj) {
  if (obj === null) return true
  if (!obj.hasOwnProperty('key')) return true
  if (typeof obj.key !== 'string') return true
  if (typeof obj !== 'object') return true
  for (let key in obj) { if (hasProperty.call(obj, key)) { return false } }
  return true
}


module.exports = { isObjEmpty, hasProperty }
