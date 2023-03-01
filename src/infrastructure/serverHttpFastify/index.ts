import { setServerHTTP } from '../../adapters/serverHTTP'

import {
  UseCaseMap,
  UseCaseRoute,
  UseCaseName,
} from '../../adapters/serverHTTP/types'

import { ServerHTTP } from '../../adapters/serverHTTP/ServerHTTP'

import startServer from './fastify'

function useServerHTTP (): ServerHTTP {
  const useCases: UseCaseMap = new Map<UseCaseName, UseCaseRoute>()

  function add (useCaseName: UseCaseName, settings: UseCaseRoute): void {
    useCases.set(useCaseName, settings)
  }

  function run (): void {
    startServer(useCases)
  }

  return {
    useCases,
    add,
    run,
  }
}

setServerHTTP(useServerHTTP())
