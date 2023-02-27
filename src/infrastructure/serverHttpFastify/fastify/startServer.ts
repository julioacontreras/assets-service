import fastify from 'fastify'
import { UseCaseMap } from '../../../adapters/serverHTTP/types'
import { logger } from '../../../adapters/logger'
import { createUseCases } from './createUseCases'

export async function startServer(useCases: UseCaseMap): Promise<void> {
  const server = fastify({
    logger: true,
  })

  // -------------------------
  //   set CORS
  // -------------------------
  if (process.env.NODE_ENV === 'development') {
    server.register(import('@fastify/cors'))
  }

  // -------------------------
  //   add use cases from application
  // -------------------------
  createUseCases(useCases, server)

  // -------------------------
  //   start server
  // -------------------------
  const port = process.env.PORT
  if (!port) {
    throw 'Dont have port selected in server'
  }

  await server.listen({ port: Number(port) }, (err, address) => {
    if (err) {
      logger.error(err.toString())
      process.exit(1)
    }
    logger.info(`Server listening at ${address}`)
  })
}
