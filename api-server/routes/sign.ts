import { FastifyRequest, FastifyReply } from 'fastify'
import { hash, compare } from 'bcrypt'

import { server, prisma } from '../utils/server'
import { createJwt } from '../utils/jwt'

//
function route() {
  server.post('/signup', signup)
  server.post('/signin', signin)
}

route();

//
async function signup(request: FastifyRequest, reply: FastifyReply) {
  const { email, passwd } = JSON.parse(request.body as string)

  try {
    return await prisma.user.create({
      data: {
        email: email,
        passwd: await hash(passwd, 10),
        profile: { create: { name: email } }
      }
    })
  } catch (e) {
    console.log(e)
    return 'error'
  }
}

async function signin(request: FastifyRequest, reply: FastifyReply) {
  const { email, passwd } = JSON.parse(request.body as string)

  const user = await prisma.user.findUnique({
    where: { email: email },
    include: { profile: true }
  })

  if (user?.passwd && await compare(passwd, user.passwd))
    return {
      jwt: createJwt(user.id, email, user.profile?.name || ''),
      profile: user.profile
    }
  else
    return { jwt: null }
}
