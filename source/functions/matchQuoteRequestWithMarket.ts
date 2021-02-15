import convertFtxOrderDataToJson from "./convertFtxOrderDataToJson"

interface FtxOrder {
    [index: number]: number
}

interface QuoteRequestBody {
    action: string,
    base_currency: string,
    quote_currency: string,
    amount: string,
}

export default (quote: QuoteRequestBody, asks: FtxOrder[], bids: FtxOrder[]) => {
    const getSum = (array: number[]) => {
        return array.reduce(function (sum, value) {
            return sum + value;
        }, 0);
    }

    if (quote.action === "buy") {
        // asks are sellers
        let remainingAmount = parseFloat(quote.amount)
        let prices = []
        const jsonAsks = asks.map(ask => convertFtxOrderDataToJson(ask))
        for (let jsonAsk of jsonAsks) {

            if (jsonAsk.amount < remainingAmount) {
                remainingAmount -= jsonAsk.amount;
                prices.push(jsonAsk.price * jsonAsk.amount)
            } else if (jsonAsk.amount >= remainingAmount) {
                prices.push(jsonAsk.price * remainingAmount)
                remainingAmount -= jsonAsk.amount;
                break;
            }
        }
        if (remainingAmount > 0) {
            return { price: getSum(prices) / (parseFloat(quote.amount) - remainingAmount), amount: parseFloat(quote.amount) - remainingAmount }

        } else {
            return { price: getSum(prices) / parseFloat(quote.amount), amount: parseFloat(quote.amount) }
        }

    } else {
        // bids are buyers
        let remainingAmount = parseFloat(quote.amount)
        let prices = []
        const jsonBids = bids.map(bid => convertFtxOrderDataToJson(bid))
        for (let jsonBid of jsonBids) {

            if (jsonBid.amount < remainingAmount) {
                remainingAmount -= jsonBid.amount;
                prices.push(jsonBid.price * jsonBid.amount)
            } else if (jsonBid.amount >= remainingAmount) {
                prices.push(jsonBid.price * remainingAmount)
                remainingAmount -= jsonBid.amount;
                break;
            }
        }
        if (remainingAmount > 0) {
            return { price: getSum(prices) / (parseFloat(quote.amount) - remainingAmount), amount: parseFloat(quote.amount) - remainingAmount }

        } else {
            return { price: getSum(prices) / parseFloat(quote.amount), amount: parseFloat(quote.amount) }
        }

    }

}