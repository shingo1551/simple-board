import { FastifyRequest, FastifyReply } from 'fastify'
import { server, prisma } from '../utils/server'

//
function route() {
  server.get('/_dev/post', post)
  server.get('/_dev/profile', profile)
  server.get('/_dev/user', user)
}

route()

//
async function post(request: FastifyRequest, reply: FastifyReply) {
  return JSON.stringify(await prisma.post.findMany(), null, '    ')
}

async function profile(request: FastifyRequest, reply: FastifyReply) {
  return JSON.stringify(await prisma.profile.findMany(), null, '    ')
}

async function user(request: FastifyRequest, reply: FastifyReply) {
  return JSON.stringify(await prisma.user.findMany(), null, '    ')
}
