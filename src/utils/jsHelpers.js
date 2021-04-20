import { isArray, isObject } from "lodash-es"

export function createIterator(array) {
  let nextIndex = 0
  return {
    next() {
      return nextIndex < array.length ? { value: array[nextIndex++], done: false } : { done: true }
    }
  }
}

// https://stackoverflow.com/a/36251811/965452
export function _mergeKeepShapeArray(dest, source) {
  if (source.length != dest.length) {
    return dest
  }
  let ret = []
  dest.forEach((v, i) => {
    ret[i] = _mergeKeepShape(v, source[i])
  })
  return ret
}

export function _mergeKeepShapeObject(dest, source) {
  let ret = {}
  Object.keys(dest).forEach(key => {
    let sourceValue = source[key]
    if (typeof sourceValue !== "undefined") {
      ret[key] = _mergeKeepShape(dest[key], sourceValue)
    } else {
      ret[key] = dest[key]
    }
  })
  return ret
}

export function _mergeKeepShape(dest, source) {
  // else if order matters here, because _.isObject is true for arrays also
  if (isArray(dest)) {
    if (!isArray(source)) {
      return dest
    }
    return _mergeKeepShapeArray(dest, source)
  } else if (isObject(dest)) {
    if (!isObject(source)) {
      return dest
    }
    return _mergeKeepShapeObject(dest, source)
  } else {
    return source
  }
}

/**
 * Merge 2 objetcs in an Immutable way, that retains the shape of the original. It will not add the 2nd object keys (if they are not present in the 1st object), it only overwrites the first obj keys.
 * @param {Object} originalObject
 * @param {Object} overwriteValues
 */
export const mergeKeepShape = (originalObject, overwriteValues) => {
  return _mergeKeepShape(originalObject, overwriteValues)
}
