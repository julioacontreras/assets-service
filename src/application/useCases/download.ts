import fs from 'fs'
import { HTTPReturn } from '@/adapters/serverHTTP/types'
import { statusHTTP } from '@/adapters/serverHTTP'

export type DownloadRequest = {
  params: {
    area: string,
    file: string
  }
}

/**
 * @api {get} /api/media/:area/:file Download file
 * @apiName Download
 * @apiGroup Media 
 *
 * @apiParam {String} area Area when will the file to download 
 * @apiParam {String} file File name with extension to download
 *
 * @apiSuccess {File} file Return file data
 */
export const downloadCaseUse = async (
  request: DownloadRequest,
): Promise<HTTPReturn> => {
  const path = `./uploads/${request.params.area}/${request.params.file}`
  const buffer = fs.readFileSync(path)

  return {
    response: buffer,
    code: statusHTTP.OK,
  }
}
