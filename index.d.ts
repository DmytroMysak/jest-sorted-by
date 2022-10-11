export {};

interface Options {
  descending?: boolean;
  strict?: boolean;
  key?: string;
  comparator?: (a: any, b: any) => number;
}

interface CustomMatchers<R = unknown> {
  toBeSortedBy<T extends []>(received: T, options: Options): R;
}

declare global {
  namespace jest {
    interface Expect extends CustomMatchers {}
    interface Matchers<R> extends CustomMatchers<R> {}
    interface InverseAsymmetricMatchers extends CustomMatchers {}
  }
}
