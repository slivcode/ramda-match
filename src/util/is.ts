// @internal
function isFn (t) {
  return typeof t === 'function';
}

// @internal
function isShallowEqual (x, y) {
  return x === y;
}

// @internal
export const is = {
  fn: isFn,
  shallowEqual: isShallowEqual,
};