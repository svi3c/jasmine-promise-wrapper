# jasmine-promise

[![Build Status](https://travis-ci.org/svi3c/jasmine-promise.svg?branch=master)](https://travis-ci.org/svi3c/jasmine-promise)

## Purpose of this library

This library shall simplify promise handling within jasmine.
To achieve this, it provides some wrapper functions which
can handle returned promises.
The specs will wait for the resolution or rejection of those
promises.

## API

The following wrapping functions are exported by this library:

* `it(description, fn, timeout)`
* `beforeEach(fn, timeout)`
* `afterEach(fn, timeout)`
* `beforeAll(fn, timeout)`
* `afterAll(fn, timeout)`

Additionaly there is an `invert(promise)` function that takes promise
and returns an inverted promise that is rejected with the original
resolution or resolved with the original rejection.
This comes in handy when expecting promises to be rejected.

## Simple example

```ts
import {it} from "jasmine-promise";

const unit = () =>
  new Promise(resolve =>
    setTimeout(() => resolve("success"), 1000));

it("should wait for a promise", () => {
  return unit()
    .then(result => {
      expect(result).toBe("success");
    });
});

// alternative with implicit returns:

it("should wait for a promise", () =>
  unit()
    .then(result =>
      expect(result).toBe("success")));

// alternative with async/await:

it("should wait for a promise", async () => {
  const result = await unit();
  expect(result).toBe("success");
});
```