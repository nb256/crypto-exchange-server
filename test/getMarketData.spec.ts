import getMarketData from "../source/functions/getMarketData";
import { expect } from 'chai';

describe("getMarketData function tests", function () {
    it("should return market data for BTC/USD", async () => {
        const result = await getMarketData("BTC", "USD");
        expect(result.data).to.not.have.property('error');
        expect(result.data).to.have.property('result');
        expect(result.data.result).to.have.property('asks');
        expect(result.data.result).to.have.property('bids');
    });
    it("should return error market data for USD/BTC", async () => {
        const result = await getMarketData("USD", "BTC");
        expect(result).to.not.have.property('data');
        expect(result.response.data).to.have.property('error');
        expect(result.response.data).to.not.have.property('result');
    });
});
