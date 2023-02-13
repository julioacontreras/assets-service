import fs from 'fs'
import { HTTPReturn } from '@/adapters/serverHTTP/types'
import { statusHTTP } from '@/adapters/serverHTTP'

type PaymentRequest = {
  body: {
    path: string
  }
}

export const downloadCaseUse = async (
  settings: unknown,
): Promise<HTTPReturn> => {
  const response = settings as PaymentRequest
  const path = `./uploads/${response.body.path}`
  const buffer = fs.readFileSync(path)

  return {
    response: buffer,
    code: statusHTTP.OK,
  }
}
