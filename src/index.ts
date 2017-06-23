// @internal
function isFn (t) {
  return typeof t === 'function';
}

const isShallowEqual = (x, y) => x === y;
/**
 * MatchFunction
 * @param items
 * @param cmpFn
 * @returns {(target: any)=>undefined}
 */
export default function match<A = any> (items: ([any, ((p: any) => A) | A])[], cmpFn = isShallowEqual) {
  function normalize ([k, v]) {
    return [
      isFn(k) ? k : (t) => cmpFn(t, k),
      isFn(v) ? v : () => v,
    ];
  }

  const pairs = items.map(normalize);
  return function (target) {
    function reducer (pr, [cond, ret]) {
      if (pr) return pr;
      return cond(target) ? ret(target) : pr;
    }

    return pairs.reduce(reducer, undefined);
  };
}