import { UseCaseRoute, UseCaseMap, UseCaseName } from './types'

export interface ServerHTTP {
  useCases: UseCaseMap
  add: (useCaseName: UseCaseName, request: UseCaseRoute) => void
  run: () => void
}
