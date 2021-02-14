import { FastifyRequest, FastifyReply, RouteOptions } from 'fastify'
import checkIfMarketNameAvailable from '../functions/checkIfMarketNameAvailable'

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
        action: { type: 'string' },
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
  handler: function (request: FastifyRequest, reply: FastifyReply) {
    if (request.validationError) {
      reply.code(400).send({ error_message: request.validationError.message })
    } else {
      const requestBody = <Body>request.body;
      const { base_currency, quote_currency, action, amount } = requestBody
      if (checkIfMarketNameAvailable(base_currency + "/" + quote_currency)) {
        reply.send({ total: 'worlddsfs', price: "1", currency: "BTC" })
      } else if (checkIfMarketNameAvailable(quote_currency + "/" + base_currency)) {
        // Currencies inverted in here
        reply.send({ total: 'worlddsfs', price: "1", currency: "BTC" })
      }
      else {
        reply.code(400).send({ error_message: `Market is not available for ${base_currency + "/" + quote_currency}` })
      }
    }
  }
}

export default route