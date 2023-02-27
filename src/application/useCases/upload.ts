import { createWriteStream, existsSync, mkdirSync } from 'fs'
import path from 'path'
import util from 'util'
import pipe from 'ts-stream'
// import crypto from 'crypto'

import { HTTPReturn } from '@/adapters/serverHTTP/types'
import { statusHTTP } from '@/adapters/serverHTTP'
import { ERROR_UPOADING_FILE } from '@/domain/constants'

const pump = util.promisify(pipe)

export type MediaRequest = {
  params: {
    area: string
    file: string
  },
  file: any
}

export type MediaResponse = {
  area: string
  file: string
}

/*
const generateFilename = async (origin: string): Promise<string> => {
  const buffer = await crypto.randomBytes(24)  
  return `${buffer.toString('hex')}${path.extname(origin)}`
}
*/

export const uploadThis = (pathName: string, fileName: string, file: any) => {
  const stream = createWriteStream(`${pathName}${fileName}`)
  stream.once('open', function (fd) {
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
 * @apiForm {String} file File name with extension to download
 *
 * @apiSuccess {String} area Area the file to uploaded
 * @apiSuccess {String} fileName File name uploaded
 */
export const uploadCaseUse = (request: MediaRequest): HTTPReturn => {
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
