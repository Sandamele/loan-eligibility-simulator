import { roundToCents } from "../../utils/roundToCents";

describe("roundToCents utility", () => {
  it("rounds numbers to two decimal places", () => {
    expect(roundToCents(10.456)).toBe(10.46);
    expect(roundToCents(5.123)).toBe(5.12);
  });

  it("leaves whole numbers as they are", () => {
    expect(roundToCents(10)).toBe(10);
    expect(roundToCents(0)).toBe(0);
  });

  it("rounds negative values correctly", () => {
    expect(roundToCents(-10.456)).toBe(-10.46);
    expect(roundToCents(-5.123)).toBe(-5.12);
  });

  it("avoids common floating point precision issues", () => {
    expect(roundToCents(0.1 + 0.2)).toBe(0.3);
  });
});
