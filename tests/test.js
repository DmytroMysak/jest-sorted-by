const { default: toBeSortedBy } = require('../dist/cjs/index');

describe('toBeSortedBy', () => {
  describe('expect.toBeSortedBy', () => {
    it('extends jest.expect', () => {
      expect(typeof expect.toBeSortedBy).toBe('function');
    });
  });

  describe('flat arrays', () => {
    it('pass: empty arrays are considered sorted', () => {
      expect(toBeSortedBy([]).pass).toBe(true);
    });
    it('pass: array of ascending numbers', () => {
      expect(toBeSortedBy([1, 2, 3]).pass).toBe(true);
    });
    it('fail: array of ascending numbers', () => {
      expect(toBeSortedBy([3, 2, 1]).pass).toBe(false);
    });
    it('pass: array of equal numbers are considered sorted', () => {
      expect(toBeSortedBy([2, 2, 2]).pass).toBe(true);
    });
    it('fail: array of ascending numbers to a point', () => {
      expect(toBeSortedBy([1, 2, 1]).pass).toBe(false);
    });
    it('pass: array of ascending numbers message provided for .not case', () => {
      expect(toBeSortedBy([1, 2, 3]).message()).toBe(
        'Expected [1,2,3] to not be sorted in ascending order'
      );
    });
    it('fail: array of ascending numbers message provided', () => {
      expect(toBeSortedBy([3, 2, 1]).message()).toBe(
        'Expected [3,2,1] to be sorted in ascending order\nExpected 3 to be after 2'
      );
    });
    it('pass - { descending: true }: array of descending numbers', () => {
      expect(toBeSortedBy([3, 2, 1], { descending: true }).pass).toBe(true);
    });
    it('fail - { descending: true }: array of descending numbers', () => {
      expect(toBeSortedBy([1, 2, 3], { descending: true }).pass).toBe(false);
    });
    it('pass - { descending: true }: array of descending numbers message provided for .not case', () => {
      expect(toBeSortedBy([3, 2, 1], { descending: true }).message()).toBe(
        'Expected [3,2,1] to not be sorted in descending order'
      );
    });
    it('fail - { descending: true }: array of descending numbers message provided', () => {
      expect(toBeSortedBy([1, 2, 3], { descending: true }).message()).toBe(
        'Expected [1,2,3] to be sorted in descending order\nExpected 1 to be before 2'
      );
    });
  });

  describe('array of objects', () => {
    const ascendingObjs = [{ num: 1 }, { num: 2 }, { num: 3 }];
    const descendingObjs = [{ num: 3 }, { num: 2 }, { num: 1 }];
    it('pass - { key: "sortKey" }: uses the passed key to sort nested objects', () => {
      expect(toBeSortedBy(ascendingObjs, { key: 'num' }).pass).toBe(true);
    });
    it('fail - { key: "sortKey" }: uses the passed key to sort nested objects', () => {
      expect(toBeSortedBy(descendingObjs, { key: 'num' }).pass).toBe(false);
    });
    it('pass - { key: "sortKey" }: message provided for .not case includes a passed key', () => {
      expect(toBeSortedBy(ascendingObjs, { key: 'num' }).message()).toBe(
        'Expected Array(3) to not be sorted by num in ascending order'
      );
    });
    it('fail - { key: "sortKey" }: message provided includes a passed key', () => {
      expect(toBeSortedBy(descendingObjs, { key: 'num' }).message()).toBe(
        'Expected Array(3) to be sorted by num in ascending order\nExpected 3 to be after 2'
      );
    });
    it('fail - { key: "missingKey" }: fails for a non-existant key', () => {
      expect(toBeSortedBy(ascendingObjs, { key: 'missing', strict: true }).pass).toBe(false);
    });
    it('fail - { key: "missingKey" }: message provided specifies the missing key', () => {
      expect(toBeSortedBy(ascendingObjs, { key: 'missing', strict: true }).message()).toBe(
        'Expected Array(3) to be sorted by a missing key, missing, in ascending order'
      );
    });
    it('pass - { key: "missingKey", strict: "false" }: passes in non-strict mode as all values are undefined', () => {
      expect(
        toBeSortedBy(ascendingObjs, { key: 'missing', strict: false }).pass
      ).toBe(true);
    });
    it('fail - { key: "missingKey", strict: "false" }: message provided for the .not case specifies the missing key', () => {
      expect(
        toBeSortedBy(ascendingObjs, { key: 'missing', strict: false }).message()
      ).toBe(
        'Expected Array(3) to not be sorted by missing in ascending order'
      );
    });
  });

  describe('non-iterables', () => {
    it('fail: all non-iterables are considered unsorted', () => {
      expect(toBeSortedBy(1).pass).toBe(false);
      expect(toBeSortedBy(1).message()).toBe(
        `1 is not iterable and cannot be sorted`
      );
    });
  });

  describe('string elements', () => {
    it('fail: message surrounds string elements in double quotes', () => {
      expect(toBeSortedBy(['5', '10']).message()).toBe(
        'Expected [5,10] to be sorted in ascending order\nExpected "5" to be after "10"'
      );
    });
  });

  describe('toBeSortedBy', () => {
    const ascendingObjs = [{ num: '1' }, { num: '2' }, { num: '3' }];
    const descendingObjs = [{ num: 3 }, { num: 2 }, { num: 1 }];
    it('extends jest.expect', () => {
      expect(typeof expect.toBeSortedBy).toBe('function');
    });
    it('is an alias for toBeSortedBy with the key option', () => {
      expect(toBeSortedBy(ascendingObjs, { key: 'num' }).pass).toBe(true);
      expect(toBeSortedBy(descendingObjs, { key: 'num' }).pass).toBe(false);
    });
    it('options are passed to toBeSortedBy', () => {
      expect(
        toBeSortedBy(ascendingObjs, { key: 'num', descending: true }).pass
      ).toBe(false);
    });
  });

  describe('compare function', () => {
    const compare = (a, b) => a.localeCompare(b);
    it('pass - for default compare function', () => {
      expect(toBeSortedBy([1, 2, 3]).pass).toBe(true);
    });
    it('fail - for default compare function', () => {
      expect(toBeSortedBy([3, 2, 1]).pass).toBe(false);
    });
    it('pass - descending with default compare function', () => {
      expect(toBeSortedBy([3, 2, 1], { descending: true }).pass).toBe(true);
    });
    it('pass - for sorted with compare function', () => {
      const sorted = ['a', 'bb', 'aa.a'].sort(compare);
      expect(toBeSortedBy(sorted, { compare }).pass).toBe(true);
    });
    it('fail - for sorted with compare function but descending', () => {
      const sorted = ['a', 'bb', 'aa.a'].sort(compare);
      expect(toBeSortedBy(sorted, { compare, descending: true }).pass).toBe(
        false
      );
    });
    it('pass - for descending sorted with compare function', () => {
      const descSorted = ['a', 'ba', 'a.b.c', 'aa.a'].sort(
        (a, b) => -compare(a, b)
      );
      expect(toBeSortedBy(descSorted, { descending: true, compare }).pass).toBe(
        true
      );
    });
  });
});