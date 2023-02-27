import { FastifyInstance, RouteGenericInterface, RouteOptions } from 'fastify'

import {
  factoryRequest
} from './requests/factoryRequest'

import multer from 'fastify-multer'
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

import { UseCaseRoute, UseCaseMap } from '../../../adapters/serverHTTP/types'

export function createUseCases(useCases: UseCaseMap, server: FastifyInstance) {
  server.register(multer.contentParser)
  useCases.forEach((useCaseRoute:UseCaseRoute, useCaseName: string) => {
    const request = factoryRequest(useCaseRoute, useCaseName)
    if (request) {
      server.route(request);
    }
  })
}
