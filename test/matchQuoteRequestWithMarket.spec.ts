import matchQuoteRequestWithMarket from "../source/functions/matchQuoteRequestWithMarket";
import orderBookResultExample from "./ftxOrderbookResultExample"
import { expect } from 'chai';

describe("matchQuoteRequestWithMarket function tests", function () {
    it("matches quote with best offers", async () => {
        // asks: [46898.0, 1],...
        const { price } = matchQuoteRequestWithMarket({
            "action": "buy",
            "base_currency": "BTC",
            "quote_currency": "USD",
            "amount": "1"
        }, orderBookResultExample.asks, orderBookResultExample.bids);
        expect(price).to.equal(46898.0)

        // bids: [46894.0, 3.7684],...
        const { price: price2 } = matchQuoteRequestWithMarket({
            "action": "sell",
            "base_currency": "BTC",
            "quote_currency": "USD",
            "amount": "3.7684"
        }, orderBookResultExample.asks, orderBookResultExample.bids);
        expect(price2).to.equal(46894.0)

        // bids: [46894.0, 3.7684], [46893.0, 0.064],...
        const { price: price3 } = matchQuoteRequestWithMarket({
            "action": "sell",
            "base_currency": "BTC",
            "quote_currency": "USD",
            "amount": "3.8324"
        }, orderBookResultExample.asks, orderBookResultExample.bids);
        expect(price3).to.be.approximately(46893.98330028181, 0.00001);
    });

    it("matches with only available bids if quote amount is too high", async () => {
        // asks: [46898.0, 1],...
        const { amount } = matchQuoteRequestWithMarket({
            "action": "buy",
            "base_currency": "BTC",
            "quote_currency": "USD",
            "amount": "123123123"
        }, orderBookResultExample.asks, orderBookResultExample.bids);
        expect(amount).to.below(123123123)

    });

});
