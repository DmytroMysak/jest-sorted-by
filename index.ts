interface Options {
  descending?: boolean;
  strict?: boolean;
  key?: string;
  comparator?: Function;
}

function defaultComparator(a: any, b: any) {
  if (a > b) return 1;
  if (a < b) return -1;
  return 0;
}

export default function toBeSortedBy<T extends []>(received: T, options: Options = {}): jest.CustomMatcherResult {
  const array = received;
  if (!Array.isArray(array)) {
    return {
      pass: false,
      message: () => `${array} is not iterable and cannot be sorted`,
    };
  }

  const { descending = false, key, strict = false, comparator = defaultComparator } = options;

  const descMult = descending ? -1 : 1;
  const arrayMsg = key ? `Array(${array.length})` : `[${array}]`;
  const orderMsg = descending ? 'descending' : 'ascending';
  let keyMsg = key ? `by ${key} ` : '';
  let failingElements = '';

  let pass = true;

  for (let i = 0; i < array.length - 1; i++) {
    const element = key ? array[i]?.[key] : array[i];
    const nextElement = key ? array[i + 1]?.[key] : array[i + 1];
    if (key && strict && !(key in array[i])) {
      pass = false;
      keyMsg = `by a missing key, ${key}, `;
      break;
    }

    if (descMult * comparator(element, nextElement) > 0) {
      pass = false;
      const elementOrder = descending ? 'before' : 'after';
      failingElements = `\nExpected ${JSON.stringify(element)} to be ${elementOrder} ${JSON.stringify(nextElement)}`;
      break;
    }
  }

  const passMsg = pass ? 'not ' : '';
  const errMsg = `Expected ${arrayMsg} to ${passMsg}be sorted ${keyMsg}in ${orderMsg} order${failingElements}`;
  return {
    pass,
    message: () => errMsg,
  };
}

expect.extend({ toBeSortedBy });
