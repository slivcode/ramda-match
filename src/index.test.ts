declare let require;
import match from './index';

const { equal } = require('assert');
const matcher = match<number>([
  [1, 2],
  [2, t => t * t],
  [(s) => s < 100, (s) => -s],
]);

[
  [1, 2],
  [2, 4],
  [3, -3],
  [100, undefined],
].map(([k, v]) => equal(matcher(k), v));