import { FastifyInstance } from 'fastify'

import {
  factoryRequest
} from './requests/factoryRequest'

import { UseCaseRoute, UseCaseMap } from '../../../adapters/serverHTTP/types'

export function createUseCases (useCases: UseCaseMap, server: FastifyInstance) {
  useCases.forEach((useCaseRoute:UseCaseRoute, useCaseName: string) => {
    const request = factoryRequest(useCaseRoute, useCaseName)
    if (request) {
      server.route(request)
    }
  })
}
