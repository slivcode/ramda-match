export namespace RamdaMatch {
  export type Pred = ((x) => boolean) | any;

  export type Resolver<A> = ((x?) => A) | A;

  export type CmpFn = (x, y) => boolean;

  export interface MatchFn<A = any> {
    (pred: Pred): {
      (handle: Resolver<A>): void
    };

    (pred: Pred, handle: Resolver<A>): void;
  }

  export interface MatchPair<A> {
    0: Pred;
    1: Resolver<A>;
  }

  export type MatchPairSet<A> = MatchPair<A>[];

  export interface Matcher {
    <A = any>(matchPairs: MatchPairSet<A>, cmpFn?: CmpFn): {
      (target?): A
    };
  }

  export interface MatchHarness {
    <A = any>(fn: (m: MatchFn<A>) => void, cmpFn?: CmpFn);
  }

  export interface Switcher {
    <A>(matchers: MatchPairSet<A>, cmpFn?: CmpFn): {};
  }

  export interface SwitcherHarness {
    <A = any>(fn: (m: MatchFn<A>) => void, cmpFn?: CmpFn): A;
  }
}