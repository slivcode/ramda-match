# ramda-match

## introduction

similar to ramda/lodash 's `cond` function.

It allows non-function for both predicate and result.

## Usage

```typescript
import match from 'ramda-match';

const matcher = match<string>([
	[1, 'one'],
	[2, () => 'two'],
	[(x) => x > 3, (t) => `${t}, a big number`],
	[() => true, `not defined`],
]);
// => 'one'
matcher(1)

// => 'two'
matcher(2)

// =>  `10, a big number`
matcher(10)

// => 'not defined'
matcher(-1)
```

if you need function support just do `() => yourFn`.

generic is the return type if applicable default to any

2nd parameter is optional compare function for non-function predicate(LHS) default to `(x, y) => x === y`