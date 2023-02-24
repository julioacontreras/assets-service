import fs from 'fs'
import { HTTPReturn } from '@/adapters/serverHTTP/types'
import { statusHTTP } from '@/adapters/serverHTTP'

type DownloadRequest = {
  params: {
    area: string,
    file: string
  }
}

export const downloadCaseUse = async (
  settings: unknown,
): Promise<HTTPReturn> => {
  const request = settings as DownloadRequest
  const path = `./uploads/${request.params.area}/${request.params.file}`
  const buffer = fs.readFileSync(path)

  return {
    response: buffer,
    code: statusHTTP.OK,
  }
}
