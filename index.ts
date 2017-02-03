interface IDoneCallback {
  (): void;
  fail(error: Error): void;
}

const promising = (action: () => any) =>
  (done: IDoneCallback) =>
    Promise.resolve(action()).then(() => done(), done.fail);

const itWithPromise = (expectation: string, assertion: () => Promise<any> | any, timeout?: number) => {
  it(expectation, promising(assertion), timeout);
};

const beforeEachWithPromise = (action: () => Promise<any> | any, timeout?: number) => {
  beforeEach(promising(action), timeout);
};

const afterEachWithPromise = (action: () => Promise<any> | any, timeout?: number) => {
  afterEach(promising(action), timeout);
};

const beforeAllWithPromise = (action: () => Promise<any> | any, timeout?: number) => {
  beforeAll(promising(action), timeout);
};

const afterAllWithPromise = (action: () => Promise<any> | any, timeout?: number) => {
  afterAll(promising(action), timeout);
};

const invert = (promise: Promise<any>) =>
  promise.then(
    resolution => Promise.reject(new Error(`Promise should be rejected, but it is resolved with: ${resolution}`)),
    err => err
  );

export {
  itWithPromise as it,
  beforeEachWithPromise as beforeEach,
  afterEachWithPromise as afterEach,
  beforeAllWithPromise as beforeAll,
  afterAllWithPromise as afterAll,
  invert
};