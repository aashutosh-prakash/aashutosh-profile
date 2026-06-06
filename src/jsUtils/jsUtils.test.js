import { throttleFunction } from "./index";

describe("throttleFunction", () => {
  beforeEach(() => jest.useFakeTimers());
  afterEach(() => jest.useRealTimers());

  it("calls preventDefault on every call, even throttled ones", () => {
    const throttled = throttleFunction(jest.fn(), 30);
    const e1 = { preventDefault: jest.fn() };
    const e2 = { preventDefault: jest.fn() };
    const e3 = { preventDefault: jest.fn() };

    throttled(e1);
    throttled(e2);
    throttled(e3);

    expect(e1.preventDefault).toHaveBeenCalledTimes(1);
    expect(e2.preventDefault).toHaveBeenCalledTimes(1);
    expect(e3.preventDefault).toHaveBeenCalledTimes(1);
  });

  it("invokes the callback only once per delay window", () => {
    const fn = jest.fn();
    const throttled = throttleFunction(fn, 30);
    const event = { preventDefault: jest.fn() };

    throttled(event);
    throttled(event);
    throttled(event);
    expect(fn).not.toHaveBeenCalled();

    jest.advanceTimersByTime(30);
    expect(fn).toHaveBeenCalledTimes(1);

    throttled(event);
    jest.advanceTimersByTime(30);
    expect(fn).toHaveBeenCalledTimes(2);
  });

  it("fires with the event that opened the window (leading edge)", () => {
    const fn = jest.fn();
    const throttled = throttleFunction(fn, 30);
    const e1 = { preventDefault: jest.fn(), id: 1 };
    const e2 = { preventDefault: jest.fn(), id: 2 };

    throttled(e1);
    throttled(e2);
    jest.advanceTimersByTime(30);

    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith(e1);
  });
});
