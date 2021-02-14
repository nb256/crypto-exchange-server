import checkIfMarketNameAvailable from "../source/functions/checkIfMarketNameAvailable";
import { expect } from 'chai';

describe("checkIfMarketNameAvailable function tests", function () {
  it("should return false if market name is unavailable, ex: APPLE/AMAZON", function () {
    const result = checkIfMarketNameAvailable("APPLE/AMAZON");
    expect(result).to.equal(false)
  });

  it("should return true if market name is available, ex: BTC/USD", function () {
    const result = checkIfMarketNameAvailable("BTC/USD");
    expect(result).to.equal(true)
  });
  it("should return false if market name is unavailable, ex: USD/BTC", function () {
    const result = checkIfMarketNameAvailable("USD/BTC");
    expect(result).to.equal(false)
  });
});
