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

describe("jasmine-promise", () => {

  describe("it()", () => {

    let finished = false;

    afterEach(() => expect(finished).toBe(true));

    it("should wait for promise resolution", () =>
      defer(10).then(() => finished = true));

    it("should work without returning promises", () => finished = true);

  });

  describe("beforeEach()", () => {

    let started = false;

    beforeEach(() => defer(10).then(() => started = true));

    it("should wait for promise resolution", () => expect(started).toBe(true));
  });

  describe("afterEach()", () => {

    let stopped = false;

    afterEach(() => defer(10).then(() => expect(stopped).toBe(true)));

    it("should wait for promise resolution", () => defer(5).then(() => stopped = true));
  });

  describe("beforeAll()", () => {

    let started = false;

    beforeAll(() => defer(10).then(() => started = true));

    it("should wait for promise resolution", () => expect(started).toBe(true));
  });

  describe("afterAll()", () => {

    let stopped = false;

    afterAll(() => defer(10).then(() => expect(stopped).toBe(true)));

    it("should wait for promise resolution", () => defer(5).then(() => stopped = true));
  });

  describe("invert()", () => {

    it("should resolve an rejected promise", async () => {
      let error = new Error("This error should become the resolution");

      let err = await invert(Promise.reject(error));
      expect(err).toBe(error);
    });

    it("should reject if the promise was resolved", async () => {
      let rejection: string;
      try {
        await invert(new Promise(resolve => resolve("foo")));
      } catch (err) {
        rejection = err;
      }
      expect(rejection).toEqual("foo");
    });

  });

});
