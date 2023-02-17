import fs from 'fs'
import { HTTPReturn } from '@/adapters/serverHTTP/types'
import { statusHTTP } from '@/adapters/serverHTTP'

type DownloadRequest = {
  params: {
    userId: string
  },
  query: {
    fileName: string
  }
}

export const downloadCaseUse = async (
  settings: unknown,
): Promise<HTTPReturn> => {
  const request = settings as DownloadRequest
  const path = `./uploads/users/${request.params.userId}/${request.query.fileName}`
  const buffer = fs.readFileSync(path)

  return {
    response: buffer,
    code: statusHTTP.OK,
  }
}
