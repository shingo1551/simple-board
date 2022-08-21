// fastify
import fastify from 'fastify'
export const server = fastify({})

// CORS
import cors from '@fastify/cors'
server.register(cors)

/*
server.register(cors, {
  origin: '*',
  allowedHeaders: ['authorization', 'content-type'],
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  credentials: true,
  exposedHeaders: ['authorization'],
  maxAge: 13000,
  preflightContinue: false,
  optionsSuccessStatus: 200,
  preflight: false,
  strictPreflight: false
})
*/

// prisma
import { PrismaClient } from '@prisma/client'
export const prisma = new PrismaClient({ log: ['query', 'info', 'warn', 'error'] })
