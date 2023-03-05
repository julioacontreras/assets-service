import { UseCaseFunction } from '../../../../adapters/serverHTTP/types'

export function useGetHandler (useCaseExecute: UseCaseFunction, useCaseName: string) {
  async function getRoute (request: any, reply: any) {  // eslint-disable-line
    if (!useCaseExecute) {
      return reply.status(500).send({ status: `Not exist use case ${useCaseName}` })
    }    
    try {
      const returnHTTP = await useCaseExecute({
        params: request.params,
        query: request.query,
      })
      return reply.status(returnHTTP.code).send(returnHTTP.response)
    } catch (err) {
      return reply.status(500).send({ status: 'internal-error' })
    }
  }
  return getRoute 
}


