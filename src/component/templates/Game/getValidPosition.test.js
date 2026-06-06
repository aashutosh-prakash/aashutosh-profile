import { getValidPosition } from "./Game";

// Documents the live behavior of the player-position clamp (field is 0..94).
describe("getValidPosition", () => {
  it("returns the centre (50) when the value cannot be parsed", () => {
    expect(getValidPosition("")).toBe(50);
    expect(getValidPosition("abc")).toBe(50);
  });

  it("wraps to the far edge (94) at or below the min edge", () => {
    expect(getValidPosition("0%")).toBe(94);
    expect(getValidPosition("-5%")).toBe(94);
  });

  it("wraps to the near edge (0) at or beyond the max edge", () => {
    expect(getValidPosition("94%")).toBe(0);
    expect(getValidPosition("120%")).toBe(0);
  });

  it("returns the parsed value when inside the field", () => {
    expect(getValidPosition("42%")).toBe(42);
  });
});
