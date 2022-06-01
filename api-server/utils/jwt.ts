// JWT
import { FastifyRequest } from 'fastify'
import { createSigner, createVerifier } from 'fast-jwt'

const secret = process.env.SECRET
const signSync = createSigner({ key: secret })
const verifySync = createVerifier({ key: secret })

interface User { id: number, email: string, name: string }

export function createJwt(id: number, email: string, name: string) {
  return signSync({ id: id, email: email, name: name })
}

export function getUser(request: FastifyRequest): User {
  const header = request.headers.authorization
  return header ? verifySync(header.split(' ')[1]) : null
}
