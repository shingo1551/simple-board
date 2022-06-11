import { server, prisma } from './utils/server'

// routes
import './routes/sign'
import './routes/profile'
import './routes/post'

// for dev
import './routes/_dev'

// http://localhost:8080/ping
server.get('/ping', async (request, reply) => {
  request.log.info('Some info about the current request')
  return 'pong\n'
})

//
server.listen({ port: 8080, host: '0.0.0.0' }, async (err, address) => {
  if (err) {
    console.error(err)
    await prisma.$disconnect()
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})
