import { FastifyInstance, RouteGenericInterface } from 'fastify'
import multer from 'fastify-multer'
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

import { UseCaseRoute, UseCaseMap } from '@/adapters/serverHTTP/types'

export function createUseCases(useCases: UseCaseMap, server: FastifyInstance) {
  server.register(multer.contentParser)
  useCases.forEach((value, key) => {
    const useCaseRoute = value as unknown as UseCaseRoute

    // -------------------------
    //   route <=> use case
    // -------------------------
    // TODO: añadir metodo

    let request: RouteGenericInterface | undefined
    if (useCaseRoute.method === 'download') {
      request = {
        method: 'GET',
        url: useCaseRoute.route,
        handler: () => {},
        preHandler: () => {},
      }
    }
    if (useCaseRoute.method === 'upload') {
      request = {
        method: 'POST',
        url: useCaseRoute.route,
        handler: () => {},
        preHandler: upload.single('file'),
      }
    }
    if (request) {
      server.route(request);
    }
    server.post(
      useCaseRoute.route,
      { preHandler:  },
      async (request: any, reply: any) => {
        const useCaseExecute = useCases.get(key)?.useCase

        if (!useCaseExecute) {
          return reply.status(500).send({ status: `Not exist use case ${key}` })
        }

        try {
          const returnHTTP = await useCaseExecute({
            body: request.body,
            file: request?.file.buffer,
          })
          return reply.status(returnHTTP.code).send(returnHTTP.response)
        } catch (err) {
          return reply.status(500).send({ status: 'internal-error' })
        }
      },
    )
  })
}
