import { expect } from 'chai';
import createServer from '../source/index';

describe("POST /quote", function () {
    it("it returns error message if base_currency and quote_currency does not match with market(BTC/USDDD)", async function () {
        const server = createServer()

        const response = await server.inject({
            method: 'POST',
            url: '/quote',
            payload:
            {
                "action": "buy",
                "base_currency": "BTC",
                "quote_currency": "USDD",
                "amount": "1"
            }
        })

        expect(response.statusCode).to.eql(400);
        expect(response.json()).to.include.keys("error_message");
    });

    it("it returns total, price, currency if base_currency and quote_currency match with market (BTC/USD)", async function () {
        const server = createServer()
        const response = await server.inject({
            method: 'POST',
            url: '/quote',
            payload:
            {
                "action": "sell",
                "base_currency": "BTC",
                "quote_currency": "USD",
                "amount": "1"
            }
        })

        expect(response.statusCode).to.eql(200);
        expect(response.json()).to.include.keys("total", "price", "currency");
    });

    it("it returns total, price, currency if inverse of base_currency and quote_currency match with market (USD/BTC)", async function () {
        const server = createServer()
        const response = await server.inject({
            method: 'POST',
            url: '/quote',
            payload:
            {
                "action": "buy",
                "base_currency": "USD",
                "quote_currency": "BTC",
                "amount": "1"
            }
        })

        expect(response.statusCode).to.eql(200);
        expect(response.json()).to.include.keys("total", "price", "currency");
    });

    it("it returns error message if action is neither 'buy' or 'sell'", async function () {
        const server = createServer()
        const response = await server.inject({
            method: 'POST',
            url: '/quote',
            payload:
            {
                "action": "buyy",
                "base_currency": "USD",
                "quote_currency": "BTC",
                "amount": "1"
            }
        })

        expect(response.statusCode).to.eql(400);
        expect(response.json()).to.include.keys("error_message");
    });
});