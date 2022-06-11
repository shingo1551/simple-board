// fastify
import fastify from 'fastify'
export const server = fastify({ logger: { level: 'info', file: 'log/api.log' } })

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

// pino for prisma
import { pino } from 'pino'
const logger = pino(pino.destination('log/prisma.log'))
logger.level = 'info'

// prisma
import { PrismaClient } from '@prisma/client'
export const prisma = new PrismaClient({ log: [{ emit: 'event', level: 'query' }, 'info', 'warn', 'error'] })
prisma.$on('query', (e) => { logger.info(e) })
