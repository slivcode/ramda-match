import { match, matchHarness, normalize, switcher, switcherHarness } from '../match';
import { is } from '../../util/is';

test('normalize test', () => {
  let [x, y] = normalize(is.shallowEqual)([1, 2]);
  expect(is.fn(x)).toBeTruthy();
  expect(is.fn(y)).toBeTruthy();
});

test('match test', () => {
  const m = match<string>([
    [1, 'one'],
    [2, () => 'two'],
    [() => true, () => {
      throw new Error;
    }],
  ]);
  expect(m(1)).toEqual('one');
  expect(m(2)).toEqual('two');
  expect(() => m(4)).toThrow();
});

test('matchHarness test', () => {
  const m = matchHarness<string>(m => {
    m(1, 'one');
    m(2, () => 'two');
    m(() => true, 'anything');
  });
  expect(m(1)).toEqual('one');
  expect(m(2)).toEqual('two');
});

test('switcher test', () => {
  const f1 = jest.fn();
  switcher([
    [() => true, f1],
  ]);
  expect(f1).toBeCalled();
});

test('switcher harness test', () => {
  const f1 = jest.fn();
  switcherHarness(s => {
    s(() => false, console.log);
    s(() => true, f1);
  });
  expect(f1).toBeCalled();
});

test.only('matchHarness curry test', () => {
  const m = matchHarness<string>(m => {
    m(1)('one');
    m(2, 'two');
  });
  expect(m(1)).toEqual('one');
  expect(m(2)).toEqual('two');
});