import { createWriteStream, existsSync, mkdirSync } from 'fs'
import path from 'path'
import util from 'util'
import pipe from 'ts-stream'
import crypto from 'crypto'

import { HTTPReturn } from '@/adapters/serverHTTP/types'
import { statusHTTP } from '@/adapters/serverHTTP'
const pump = util.promisify(pipe)

type PaymentRequest = {
  body: {
    fileName: string
  },
  params: {
    area: string
  },
  file: any
}

const generateFilename = async (origin: string): Promise<string> => {
  const buffer = await crypto.randomBytes(24)  
  return `${buffer.toString('hex')}${path.extname(origin)}`
}

const prepareDestinyPath = async (userId: string): Promise<string> => { 
  return `./uploads/${userId}/`
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
export const uploadCaseUse = async (request: unknown): Promise<HTTPReturn> => {
  const response = request as PaymentRequest
  const area = response.params.area as string
  const fileName = await generateFilename(response.body.fileName) 
  const pathName = await prepareDestinyPath(area) 

  if (!existsSync(pathName)) {
    mkdirSync(pathName, { recursive: true })
  }

  const stream = createWriteStream(`${pathName}${fileName}`)
  stream.once('open', function (fd) {
    stream.write(response.file)
    stream.end()
  })

  return {
    response: {
      fileName,
      area 
    },
    code: statusHTTP.OK,
  }
}
