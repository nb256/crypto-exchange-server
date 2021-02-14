import fastify, { FastifyRequest, FastifyReply } from 'fastify'

const server = fastify()

server.post('/ping', async (request: FastifyRequest, reply: FastifyReply) => {
  console.log({ bod: request.body, b: request.url })
  return 'pong\n'
})

server.listen(8080, (err: Error, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})