import { describe, expect, test } from 'vitest';

import { add, greet, meaning } from './reader';

describe('Reader', () => {
  test('adds', () => {
    expect(add(2, 3)).toEqual(5);
  });
  test('greets', () => {
    expect(greet('world')).toEqual('reader says: hello to world');
  });
  test('meaning', () => {
    expect(meaning.life).toEqual(42);
  });
});
