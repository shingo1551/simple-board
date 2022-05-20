import { server, prisma } from './utils/server'

// routes
import './routes/sign'
import './routes/profile'
import './routes/post'

// http://localhost:8080/ping
server.get('/ping', async (request, reply) => {
  return 'pong\n'
})

// http://localhost:8080/user
server.get('/user', async (request, reply) => {
  return await prisma.user.findMany({
    include: { posts: true, profile: true }
  })
})

//
server.listen(8080, async (err, address) => {
  if (err) {
    console.error(err)
    await prisma.$disconnect()
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})
