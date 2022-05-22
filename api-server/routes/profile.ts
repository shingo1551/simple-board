import { FastifyRequest, FastifyReply } from 'fastify'

import { server, prisma } from '../utils/server'
import { getUser } from '../utils/jwt'

// http://localhost:8080/profile
function route() {
  server.get('/profile', get)
  server.put('/profile', put)
}

async function get(request: FastifyRequest, reply: FastifyReply) {
  const user = getUser(request)

  // prisma:query SELECT `main`.`Post`.`id`, `main`.`Post`.`message`, `main`.`Post`.`updatedAt`, `main`.`Post`.`userId` FROM `main`.`Post` WHERE 1=1 LIMIT ? OFFSET ?
  // prisma:query SELECT `main`.`Profile`.`id`, `main`.`Profile`.`name`, `main`.`Profile`.`userId` FROM `main`.`Profile` WHERE `main`.`Profile`.`userId` IN (?,?,?,?) LIMIT ? OFFSET ?
  return await prisma.profile.findUnique({
    where: { id: user.id }
  })
}

async function put(request: FastifyRequest, reply: FastifyReply) {
  const user = getUser(request)
  const { name, phone } = JSON.parse(request.body as string)

  // prisma:query BEGIN
  // prisma:query SELECT `main`.`Profile`.`id` FROM `main`.`Profile` WHERE `main`.`Profile`.`userId` = ?
  // prisma:query UPDATE `main`.`Profile` SET `name` = ?, `phone` = ? WHERE `main`.`Profile`.`id` IN (?)
  // prisma:query SELECT `main`.`Profile`.`id`, `main`.`Profile`.`name`, `main`.`Profile`.`birthDay`, `main`.`Profile`.`phone`, `main`.`Profile`.`userId` FROM `main`.`Profile` WHERE `main`.`Profile`.`id` = ? LIMIT ? OFFSET ?
  // prisma:query COMMIT
  return await prisma.profile.update({
    where: { userId: user.id },
    data: { name: name, phone: phone, birthDay: undefined }
  })
}

route()
