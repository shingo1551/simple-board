// fastify
import fastify from 'fastify'
export const server = fastify()

// CORS
import cors from '@fastify/cors'
server.register(cors)

//prisma
import { PrismaClient } from '@prisma/client'
export const prisma = new PrismaClient({ log: ['query', 'info', 'warn', 'error'] })
