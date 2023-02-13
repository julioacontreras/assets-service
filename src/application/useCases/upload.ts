import { createWriteStream, existsSync, mkdirSync } from 'fs'
import path from 'path'
import util from 'util'
import pipe from 'ts-stream'

import { HTTPReturn } from '@/adapters/serverHTTP/types'
import { statusHTTP } from '@/adapters/serverHTTP'
const pump = util.promisify(pipe)

type PaymentRequest = {
  body: {
    destiny: string
  }
  file: any
}

export const uploadCaseUse = async (request: unknown): Promise<HTTPReturn> => {
  const response = request as PaymentRequest
  const destiny = `./uploads/${response.body.destiny}`
  const buffer = response.file
  if (!existsSync(destiny)) mkdirSync(destiny, { recursive: true })
  const stream = createWriteStream(destiny)
  stream.once('open', function (fd) {
    stream.write(buffer)
    stream.end()
  })

  return {
    response: {},
    code: statusHTTP.OK,
  }
}
