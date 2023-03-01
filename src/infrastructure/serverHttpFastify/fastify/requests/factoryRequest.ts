import { UseCaseRoute } from '../../../../adapters/serverHTTP/types'
import { RouteOptions } from 'fastify'
import { useUploadPreHandler, useUploadHandler } from './uploadRequest'
import { useDownloadHandler } from './downloadRequest'

export function factoryRequest (
  useCaseRoute: UseCaseRoute,
  useCaseName: string,
): RouteOptions | undefined {
  if (useCaseRoute.method === 'download') {
    return {
      method: 'GET',
      url: useCaseRoute.route,
      handler: useDownloadHandler(useCaseRoute.useCase, useCaseName),
    }
  }
  if (useCaseRoute.method === 'upload') {
    return {
      method: 'POST',
      url: useCaseRoute.route,
      handler: useUploadHandler(useCaseRoute.useCase, useCaseName),
      preHandler: useUploadPreHandler(),
    }
  }
  return undefined
}
