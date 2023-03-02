import { createWriteStream, existsSync, mkdirSync } from 'fs'

import { HTTPReturn } from '../../adapters/serverHTTP/types'
import { statusHTTP } from '../../adapters/serverHTTP'
import { ERROR_UPOADING_FILE } from '../../domain/constants'

import { getSchemaRequest, prepareErrorParamsRequest } from '../../domain/shared/validateRequest'

export type MediaRequest = {
  params: {
    area: string
    file: string
  },
  file: Buffer
}

export type MediaResponse = {
  area: string
  file: string
}

export const uploadThis = (pathName: string, fileName: string, file: Buffer) => {
  const stream = createWriteStream(`${pathName}${fileName}`)
  stream.once('open', function () {
    stream.write(file)
    stream.end()
  })
}

const prepareDestinyPath = (area: string): string => { 
  return `./uploads/${area}/`
}

/**
 * @api {post} /api/media/:area/:file Upload file
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
export const uploadCaseUse = (request: MediaRequest): HTTPReturn => {
  const schema = getSchemaRequest()
  const { error } = schema.validate(request.params)
  if (error){
    return {
      response: prepareErrorParamsRequest(error),
      code: statusHTTP.INTERNAL_SERVER_ERROR,
    }
  }

  const area = request.params.area as string
  const fileName = request.params.file
  const pathName = prepareDestinyPath(area) 

  if (!existsSync(pathName)) {
    mkdirSync(pathName, { recursive: true })
  }

  try {
    uploadThis(pathName, fileName, request.file)
    return {
      response: {
        file: fileName,
        area 
      },
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
