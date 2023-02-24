import { UseCaseFunction } from '@/adapters/serverHTTP/types'
import multer from 'fastify-multer'
const storage = multer.memoryStorage()

const upload = multer({ storage: storage })
export function useUploadPreHandler() {
    return upload.single('file')
}

export function useUploadHandler (useCaseExecute: UseCaseFunction, name: string) {
    async function uploadRoute (request: any, reply: any) {
        if (!useCaseExecute) {
          return reply.status(500).send({ status: `Not exist use case ${name}` })
        }    
        try {
          const returnHTTP = await useCaseExecute({
            body: request.body,
            params: request.params,
            file: request.file.buffer,
          })
          return reply.status(returnHTTP.code).send(returnHTTP.response)
        } catch (err: any) {
          const message = process.env.NODE_ENV === 'development' ? { message: err.messge} : {}
          return reply.status(500).send({ status: 'internal-error', ...message })
        }
      }
      return uploadRoute
  }