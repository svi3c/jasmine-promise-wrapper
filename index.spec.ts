import {
  it,
  beforeEach,
  afterEach,
  beforeAll,
  afterAll,
  invert,
} from "./index";

const defer = (timeout = 0) =>
  new Promise(resolve => setTimeout(resolve, timeout));

let suiteRunning = false;
let running = false;

const start = () => running = true;
const stop = () => running = false;
const startSuite = () => suiteRunning = true;
const stopSuite = () => suiteRunning = false;

afterAll(() => expect(suiteRunning).toBe(false));

describe("jasmine-promise", () => {

  beforeAll(() => defer(10).then(startSuite));
  afterAll(() => defer(10).then(stopSuite));

  beforeEach(() => {
    expect(suiteRunning).toBe(true);
    return defer(10).then(start);
  });
  afterEach(() => defer(10).then(() => expect(running).toBe(false)));
  beforeEach(() => expect(running).toBe(true));

  describe("it()", () => {

    it("should wait for promise resolution", () =>
      defer(10).then(stop));

    it("should work without returning promises", () => {
      stop();
    });

  });

  describe("invert()", () => {

    it("should resolve an rejected promise", async () => {
      let error = new Error("This error should become the resolution");

      let err = await invert(Promise.reject(error));
      expect(err).toBe(error);
      stop();
    });

    it("should reject if the promise was resolved", async () => {
      let error: Error;
      try {
        await(invert(new Promise(resolve => setTimeout(() => resolve("foo")))));
      } catch (err) {
        error = err;
      }
      expect(error.message).toEqual("Promise should be rejected, but it is resolved with: foo");
      stop();
    });

  });

});