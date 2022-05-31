import { FastifyRequest, FastifyReply } from 'fastify'
import { hash, compare } from 'bcrypt'

import { server, prisma } from '../utils/server'
import { createJwt } from '../utils/jwt'

function route() {
  // http://localhost:8080/sign-up
  server.post('/sign-up', signUp)
  // http://localhost:8080/sign-in
  server.post('/sign-in', signIn)
}

async function signUp(request: FastifyRequest, reply: FastifyReply) {
  const { email, passwd } = JSON.parse(request.body as string)

  try {
    // prisma:query BEGIN
    // prisma:query INSERT INTO `main`.`User` (`email`, `passwd`) VALUES (?,?) RETURNING id
    // prisma:query INSERT INTO `main`.`Profile` (`name`, `userId`) VALUES (?,?) RETURNING id
    // prisma:query SELECT `main`.`User`.`id`, `main`.`User`.`email`, `main`.`User`.`passwd` FROM `main`.`User` WHERE `main`.`User`.`id` = ? LIMIT ? OFFSET ?
    // prisma:query COMMIT
    return await prisma.user.create({
      data: {
        email: email,
        passwd: await hash(passwd, 10),
        profile: { create: { name: email } }
      }
    })
    // {
    //   "id": 6,
    //   "email": "EMAIL",
    //   "passwd": "$2b$10$6vl4VumpP3xhLjfJJsC/I.wwifCZI/73Gf4Gcjav9pYXjnMBvIwRG"
    // }
  } catch {
    return 'error'
  }
}

async function signIn(request: FastifyRequest, reply: FastifyReply) {
  const { email, passwd } = JSON.parse(request.body as string)

  // prisma:query SELECT `main`.`User`.`id`, `main`.`User`.`email`, `main`.`User`.`passwd` FROM `main`.`User` WHERE `main`.`User`.`email` = ? LIMIT ? OFFSET ?
  // prisma:query SELECT `main`.`Profile`.`id`, `main`.`Profile`.`name`, `main`.`Profile`.`birthDay`, `main`.`Profile`.`phone`, `main`.`Profile`.`userId` FROM `main`.`Profile` WHERE `main`.`Profile`.`userId` IN (?) LIMIT ? OFFSET ?
  const user = await prisma.user.findUnique({
    where: { email: email },
    include: { profile: true }
  })

  if (user?.passwd && await compare(passwd, user.passwd))
    return {
      jwt: createJwt(user.id, email, user.profile?.name || ''),
      profile: user.profile
    }
  // {
  //   "jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwiZW1haWwiOiIzIiwibmFtZSI6IjMiLCJpYXQiOjE2NTM5Njg2NTZ9.0k0sfLmvkPboTNcusNsV9pqvr7GvkTcbVsVyUWHdyAc",
  //   "profile": {
  //     "id": 6,
  //     "name": "3",
  //     "birthDay": null,
  //     "phone": null,
  //     "userId": 6
  //   }
  // }
  else
    return 'error'
}

route()
