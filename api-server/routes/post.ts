import { FastifyRequest, FastifyReply } from 'fastify'

import { server, prisma } from '../utils/server'
import { getUser } from '../utils/jwt'

// http://localhost:8080/post
function route() {
  server.get('/post', get)
  server.post('/post', post)
}

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

  if (user) {
    // prisma:query BEGIN
    // prisma:query INSERT INTO `main`.`Post` (`createdAt`, `updatedAt`, `message`, `userId`) VALUES (?,?,?,?) RETURNING id
    // prisma:query SELECT `main`.`Post`.`id`, `main`.`Post`.`createdAt`, `main`.`Post`.`updatedAt`, `main`.`Post`.`message`, `main`.`Post`.`userId` FROM `main`.`Post` WHERE `main`.`Post`.`id` = ? LIMIT ? OFFSET ?
    // prisma:query COMMIT
    await prisma.post.create({
      data: { userId: user.id, message: message }
    })
    return findMany()
  } else
    return "error"

}

async function findMany() {
  // prisma:query SELECT `main`.`Post`.`id`, `main`.`Post`.`message`, `main`.`Post`.`updatedAt`, `main`.`Post`.`userId` FROM `main`.`Post` WHERE 1=1 LIMIT ? OFFSET ?
  // prisma:query SELECT `main`.`Profile`.`id`, `main`.`Profile`.`name`, `main`.`Profile`.`userId` FROM `main`.`Profile` WHERE `main`.`Profile`.`userId` IN (?,?,?) LIMIT ? OFFSET ?
  return await prisma.post.findMany({
    select: {
      message: true,
      updatedAt: true,
      profile: { select: { name: true } }
    }
  })
}

route()
