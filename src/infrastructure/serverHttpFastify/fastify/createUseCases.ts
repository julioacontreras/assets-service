import { FastifyInstance } from 'fastify'

import {
  factoryRequest
} from './requests/factoryRequest'

import multer from 'fastify-multer'

import { UseCaseRoute, UseCaseMap } from '../../../adapters/serverHTTP/types'

export function createUseCases (useCases: UseCaseMap, server: FastifyInstance) {
  server.register(multer.contentParser)
  useCases.forEach((useCaseRoute:UseCaseRoute, useCaseName: string) => {
    const request = factoryRequest(useCaseRoute, useCaseName)
    if (request) {
      server.route(request)
    }
  })
}
