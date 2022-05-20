// fastify
import fastify from 'fastify'
import cors from '@fastify/cors'

export const server = fastify()
server.register(cors)

//prisma
import { PrismaClient } from '@prisma/client'
export const prisma = new PrismaClient({ log: ['query', 'info', 'warn', 'error'] })
