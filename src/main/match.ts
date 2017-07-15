import { RamdaMatch } from '../util/interface';
import { is } from '../util/is';
import Matcher = RamdaMatch.Matcher;
import MatchHarness = RamdaMatch.MatchHarness;
import Switcher = RamdaMatch.Switcher;
import SwitcherHarness = RamdaMatch.SwitcherHarness;

// @internal
export function normalize (cmpFn) {
  return ([k, v]) => [
    is.fn(k) ? k : (t) => cmpFn(t, k),
    is.fn(v) ? v : () => v,
  ];
}

export const match: Matcher = function match (set, cmpFn = is.shallowEqual) {
  const pairs = set.map(normalize(cmpFn));

  return function getResult (target?) {
    let done = false;

    function reducer (pr, [pred, resolve]) {
      if (done) return pr;
      if (pred(target)) {
        done = true;
        return resolve(target);
      }
    }

    return pairs.reduce(reducer, undefined);
  };
};

// @internal
export function createHarness (handler) {
  return (fn, cmpFn = is.shallowEqual) => {
    const matchSets = [];
    fn((k, v) => matchSets.push([k, v]));
    return handler(matchSets, cmpFn);
  };
}

export const matchHarness: MatchHarness = createHarness(match);

export const switcher: Switcher = function switcher (set, cmpFn = is.shallowEqual) {
  return match(set, cmpFn)();
};

export const switcherHarness: SwitcherHarness = createHarness(switcher);