import { FastifyRequest, FastifyReply } from 'fastify'

import { server, prisma } from '../utils/server'
import { getUser } from '../utils/jwt'

//
function route() {
  server.get('/post', get)
  server.post('/post', post)
}

route();

//
async function get(request: FastifyRequest, reply: FastifyReply) {
  const user = getUser(request)
  if (user)
    return findMany()
  else
    return "error"
}

async function post(request: FastifyRequest, reply: FastifyReply) {
  const user = getUser(request)
  const { message } = JSON.parse(request.body as string)

  await prisma.post.create({
    data: { userId: user.id, message: message }
  })
  return findMany()
}

async function findMany() {
  return await prisma.post.findMany({
    select: {
      message: true,
      updatedAt: true,
      profile: { select: { name: true } }
    }
  })
}
