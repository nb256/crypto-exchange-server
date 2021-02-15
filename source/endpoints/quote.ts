import { FastifyRequest, FastifyReply, RouteOptions } from 'fastify'
import checkIfMarketNameAvailable from '../functions/checkIfMarketNameAvailable'
import matchQuoteRequestWithMarket from '../functions/matchQuoteRequestWithMarket'
import getMarketData from '../functions/getMarketData'

interface Body {
  action: string,
  base_currency: string,
  quote_currency: string,
  amount: string,
}

const route: RouteOptions = {
  method: 'POST',
  url: '/quote',
  schema: {
    body: {
      properties: {
        action: { type: 'string', enum: ['buy', 'sell'] },
        base_currency: { type: 'string' },
        quote_currency: { type: 'string' },
        amount: { type: 'string' }
      },
      required: ['action', 'base_currency', 'quote_currency', 'amount'],
    },
    response: {
      200: {
        type: 'object',
        properties: {
          total: { type: 'string' },
          price: { type: 'string' },
          currency: { type: 'string' }
        }
      },
      400: {
        type: 'object',
        properties: {
          error_message: { type: 'string' },
        }
      }
    },
  },
  attachValidation: true,
  handler: async (request: FastifyRequest, reply: FastifyReply) => {
    if (request.validationError) {
      reply.code(400).send({ error_message: request.validationError.message })
    } else {
      const requestBody = <Body>request.body;
      const { base_currency, quote_currency, action, amount } = requestBody
      if (checkIfMarketNameAvailable(base_currency + "/" + quote_currency)) {
        const marketData = await getMarketData(base_currency, quote_currency)
        if (marketData && marketData.data) {
          const result = matchQuoteRequestWithMarket({ base_currency, quote_currency, action, amount }, marketData.data.result.asks, marketData.data.result.bids)
          reply.send({ total: result.price * result.amount, price: result.price, currency: quote_currency })
        }
      } else if (checkIfMarketNameAvailable(quote_currency + "/" + base_currency)) {
        // Currencies inverted in here
        const marketData = await getMarketData(quote_currency, base_currency)
        const result = matchQuoteRequestWithMarket({ base_currency: quote_currency, quote_currency: base_currency, action: action === "sell" ? "buy" : "sell", amount }, marketData.data.result.asks, marketData.data.result.bids)
        // invert result price to 1/result.price here
        reply.send({ total: (1 / result.price) * result.amount, price: 1 / result.price, currency: quote_currency })
      }
      else {
        reply.code(400).send({ error_message: `Market is not available for ${base_currency + "/" + quote_currency}` })
      }
    }
  }
}

export default route