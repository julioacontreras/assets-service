import fastify from 'fastify'
import { UseCaseMap } from '../../../adapters/serverHTTP/types'
import { logger } from '../../../adapters/logger'
import { createUseCases } from './createUseCases'
import helmet from '@fastify/helmet'
import multer from 'fastify-multer'

export async function startServer (useCases: UseCaseMap): Promise<void> {
  const server = fastify({
    logger: true,
  })

  const env = process.env.NODE_ENV || 'production' 
  logger.info(env)

  // -------------------------
  //   set CORS
  // -------------------------
  if (env === 'development') {
    await server.register(import('@fastify/cors'))
  }

  if (env === 'production') {
    // -------------------------
    //   set Security
    // -------------------------
    await server.register(
      helmet,
      // Example disables the `contentSecurityPolicy` middleware but keeps the rest.
      { contentSecurityPolicy: false }      
    )

    // -------------------------
    //   set compression hook
    // -------------------------
    await server.register(
      import('@fastify/compress'),
      { global: false }
    )    
  }


  // -------------------------
  //   to make uploads
  // -------------------------
  server.register(multer.contentParser)


  // -------------------------
  //   add use cases from application
  // -------------------------
  createUseCases(useCases, server)

  // -------------------------
  //   start server
  // -------------------------
  const port = process.env.MEDIA_SERVICE_PORT
  if (!port) {
    throw 'Dont have port selected in server'
  }

  await server.listen({ 
    port: Number(port),
    host: '0.0.0.0',
  }, (err, address) => {
    if (err) {
      logger.error(err.toString())
      process.exit(1)
    }
    logger.info(`Server listening at ${address}`)
  })
}
