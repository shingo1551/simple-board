import { FastifyRequest, FastifyReply } from 'fastify'
import { server, prisma } from '../utils/server'

function route() {
  // http://localhost:8080/_dev/post
  server.get('/_dev/post', post)
  // http://localhost:8080/_dev/profile
  server.get('/_dev/profile', profile)
  // http://localhost:8080/_dev/user
  server.get('/_dev/user', user)
}

async function post(request: FastifyRequest, reply: FastifyReply) {
  // prisma:query SELECT `main`.`Post`.`id`, `main`.`Post`.`createdAt`, `main`.`Post`.`updatedAt`, `main`.`Post`.`message`, `main`.`Post`.`userId` FROM `main`.`Post` WHERE 1=1 LIMIT ? OFFSET ?
  return JSON.stringify(await prisma.post.findMany(), null, '    ')
}

async function profile(request: FastifyRequest, reply: FastifyReply) {
  // prisma:query SELECT `main`.`Profile`.`id`, `main`.`Profile`.`name`, `main`.`Profile`.`birthDay`, `main`.`Profile`.`phone`, `main`.`Profile`.`userId` FROM `main`.`Profile` WHERE 1=1 LIMIT ? OFFSET ?
  return JSON.stringify(await prisma.profile.findMany(), null, '    ')
}

async function user(request: FastifyRequest, reply: FastifyReply) {
  // prisma:query SELECT `main`.`User`.`id`, `main`.`User`.`email`, `main`.`User`.`passwd` FROM `main`.`User` WHERE 1=1 LIMIT ? OFFSET ?
  return JSON.stringify(await prisma.user.findMany(), null, '    ')
}

route()
