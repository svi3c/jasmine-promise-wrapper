const promising = (fn: () => any) =>
  (done: any) =>
    Promise.resolve(fn()).then(() => done(), done.fail);

const itWithPromise = (expectation: string, fn: () => any, timeout?: number) => {
  it(expectation, promising(fn), timeout);
};

const fitWithPromise = (expectation: string, fn: () => any, timeout?: number) => {
  fit(expectation, promising(fn), timeout);
};

const beforeEachWithPromise = (fn: () => any, timeout?: number) => {
  beforeEach(promising(fn), timeout);
};

const afterEachWithPromise = (fn: () => any, timeout?: number) => {
  afterEach(promising(fn), timeout);
};

const beforeAllWithPromise = (fn: () => any, timeout?: number) => {
  beforeAll(promising(fn), timeout);
};

const afterAllWithPromise = (fn: () => any, timeout?: number) => {
  afterAll(promising(fn), timeout);
};

const invert = (promise: Promise<any>) =>
  promise.then(
    resolution => Promise.reject(resolution),
    err => err
  );

export {
  itWithPromise as it,
  fitWithPromise as fit,
  beforeEachWithPromise as beforeEach,
  afterEachWithPromise as afterEach,
  beforeAllWithPromise as beforeAll,
  afterAllWithPromise as afterAll,
  invert
};