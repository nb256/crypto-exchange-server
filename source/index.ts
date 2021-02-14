import fastify, { FastifyRequest, FastifyReply, RouteOptions } from 'fastify'
import quote from "./endpoints/quote"

function createServer(logger: boolean = false) {
  const app = fastify({
    logger
  })
  app.route(quote)
  return app
}

// this module was run directly from the command line as in node xxx.js when require.main === module
if (require.main === module) {
  const app = createServer(true)
  app.listen(80, (err: Error, address) => {
    if (err) {
      console.error(err)
      process.exit(1)
    }
    console.log(`Server listening at ${address}`)
  })
}

export default createServer
