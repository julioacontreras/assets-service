import { UseCaseFunction } from "@/adapters/serverHTTP/types"

export function useDownloadHandler(useCaseExecute: UseCaseFunction, useCaseName: string) {
  async function downloadRoute (request: any, reply: any) {
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
  return downloadRoute 
}


