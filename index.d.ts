interface Options {
  descending?: boolean;
  strict?: boolean;
  key?: string;
  comparator: Function;
}

interface CustomMatchers<R = unknown> {
  toBeSortedBy<T extends []>(array: T, options: Options): R;
}

declare global {
  namespace jest {
    interface Expect extends CustomMatchers {}
    interface Matchers<R> extends CustomMatchers<R> {}
    interface InverseAsymmetricMatchers extends CustomMatchers {}
  }
}
