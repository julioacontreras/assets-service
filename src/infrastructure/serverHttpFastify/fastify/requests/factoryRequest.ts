import { UseCaseRoute } from '../../../../adapters/serverHTTP/types'
import { RouteOptions } from 'fastify'
import { useUploadPreHandler, useUploadHandler } from './uploadRequest'
import { useDownloadHandler } from './downloadRequest'
import { useGetHandler } from './getRequest'

export function factoryRequest (
  useCaseRoute: UseCaseRoute,
  useCaseName: string,
): RouteOptions | undefined {
  if (useCaseRoute.method === 'get') {
    return {
      method: 'GET',
      url: useCaseRoute.route,
      handler: useGetHandler(useCaseRoute.useCase, useCaseName),
    }
  } else
  if (useCaseRoute.method === 'download') {
    return {
      method: 'GET',
      url: useCaseRoute.route,
      handler: useDownloadHandler(useCaseRoute.useCase, useCaseName),
    }
  } else
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
