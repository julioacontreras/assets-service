import * as fs from 'fs'
import { HTTPReturn } from '../../../adapters/serverHTTP/types'
import { statusHTTP } from '../../../adapters/serverHTTP'
import { ERROR_INVALID_FILE_PATH_NAME } from '../../../domain/shared/constants'
import { getSchemaRequest, prepareErrorParamsRequest } from '../../../domain/shared/validateRequest'

export type DownloadRequest = {
  params: {
    area: string
    file: string
  }
}

/**
 * @api {get} /api/v1/media/:area/:file Download file
 * @apiName Download
 * @apiGroup Media
 *
 * @apiParam {String} area Area when will the file to download
 * @apiParam {String} file File name with extension to download
 *
 * @apiSuccess {File} file Return file data
 */
export const downloadCaseUse = (request: DownloadRequest): HTTPReturn => {
  const schema = getSchemaRequest()
  const { error } = schema.validate(request.params)
  if (error){
    return {
      response: prepareErrorParamsRequest(error),
      code: statusHTTP.INTERNAL_SERVER_ERROR,
    }
  }

  const filenamepath = `./uploads/${request.params.area}/${request.params.file}`
  try {
    const buffer = fs.readFileSync(filenamepath)
    return {
      response: buffer,
      code: statusHTTP.OK,
    }
  } catch (err) {
    return {
      response: {
        error: {
          code: ERROR_INVALID_FILE_PATH_NAME,
          message: 'Invalid path file name',
        },  
      },
      code: statusHTTP.INTERNAL_SERVER_ERROR,
    }
  }
}
