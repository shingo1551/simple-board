// fastify
import fastify from 'fastify'
export const server = fastify({})

// CORS
import cors from '@fastify/cors'
server.register(cors)

/*
server.register(cors, {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 204,
  credentials: false,
  exposedHeaders: null,
  allowedHeaders: null,
  maxAge: null,
  preflight: true,
  strictPreflight: true})
*/

// prisma
import { PrismaClient } from '@prisma/client'
export const prisma = new PrismaClient({ log: ['query', 'info', 'warn', 'error'] })
