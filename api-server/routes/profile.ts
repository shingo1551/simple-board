import { FastifyRequest, FastifyReply } from 'fastify'

import { server, prisma } from '../utils/server'
import { getUser } from '../utils/jwt'

//
function route() {
  server.get('/profile', get)
  server.put('/profile', put)
}

route();

//
async function get(request: FastifyRequest, reply: FastifyReply) {
  const user = getUser(request)

  return await prisma.profile.findUnique({
    where: { id: user.id }
  })
}

async function put(request: FastifyRequest, reply: FastifyReply) {
  const user = getUser(request)
  const { name, phone } = JSON.parse(request.body as string)

  return await prisma.profile.update({
    where: { userId: user.id },
    data: { name: name, phone: phone, birthDay: undefined }
  })
}
