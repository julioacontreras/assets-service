import { HTTPReturn } from '../../../adapters/serverHTTP/types'
import { statusHTTP } from '../../../adapters/serverHTTP'

import { ERROR_UPOADING_FILE } from '../../../domain/shared/constants'
import { getSchemaRequest, prepareErrorParamsRequest } from '../../../domain/shared/validateRequest'
import { upload } from '../../../domain/upload'

export type MediaRequest = {
  params: {
    area: string
    file: string
  },
  file: Buffer
}

/**
 * @api {post} /api/v1/media/:area/:file Upload file
 * @apiName Upload
 * @apiGroup Media 
 *
 * @apiParam {String} area Area when will the file to upload 
 * 
 * @apiParam {String} file File name with extension to download
 *
 * @apiSuccess {String} area Area the file to uploaded
 * @apiSuccess {String} fileName File name uploaded
 */
export const uploadCaseUse = async (request: MediaRequest): Promise<HTTPReturn> => {
  const schema = getSchemaRequest()
  const { error } = schema.validate(request.params)
  if (error){
    return {
      response: prepareErrorParamsRequest(error),
      code: statusHTTP.INTERNAL_SERVER_ERROR,
    }
  }
  
  try {
    const response = await upload(request.params.area, request.params.file, request.file)
    return {
      response,
      code: statusHTTP.OK,
    }
  } catch(err) {
    return {
      response: {
        error: {
          code: ERROR_UPOADING_FILE,
          message: 'Error uploading file',
        },  
      },
      code: statusHTTP.INTERNAL_SERVER_ERROR,
    }
  }
}
