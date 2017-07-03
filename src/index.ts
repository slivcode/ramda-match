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
  return function (target?) {
    let done = false;

    function reducer (pr, [cond, ret]) {
      if (done) return pr;
      if (cond(target)) {
        done = true;
        return ret(target);
      }
      return pr;
    }

    return pairs.reduce(reducer, undefined);
  };
}

export const matchArg = (item?) =>
  <A> (condPairs: ([any, ((p: any) => A) | A])[], cmpFn = isShallowEqual) =>
    match(condPairs, cmpFn)(item);

export const switcher = matchArg();