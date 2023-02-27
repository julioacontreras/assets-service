import * as fs from 'fs'

import { AppError } from '../../../src/adapters/serverHTTP/types'
import { ERROR_INVALID_FILE_PATH_NAME } from '../../../src/domain/constants'
import { downloadCaseUse } from '../../../src/application/useCases/download'

jest.mock('fs', () => {
  return {
    __esModule: true,
    ...jest.requireActual('fs'),
  }
})

const readFileSyncSpy = jest.spyOn(fs, 'readFileSync')

describe('test download request', () => {
  beforeEach(() => {
    readFileSyncSpy.mockReset()
    readFileSyncSpy.mockClear()
  })

  test('Shold be result success', async () => {
    readFileSyncSpy.mockReturnValue(Buffer.alloc(10))
    const result = await downloadCaseUse({
      params: {
        area: 'user-1',
        file: 'image.jpg',
      },
    })
    expect(result).toHaveProperty('response')
    expect(result).toHaveProperty('code')
    expect(result.response).toBeDefined()
    expect(result.code).toEqual(200)
  })

  test('Shold be result not found', () => {
    readFileSyncSpy.mockImplementation(() => {
      throw new Error('some error')
    })
    const result = downloadCaseUse({
      params: {
        area: 'user-1',
        file: 'image.jpg',
      },
    })
    const error = result.response as AppError
    expect(error).toHaveProperty('error')
    expect(error.error.code).toEqual(ERROR_INVALID_FILE_PATH_NAME)
  })
})
