import * as fs from 'fs'
import * as util from 'util'

import { AppError } from '../../../../src/adapters/serverHTTP/types'
import { ERROR_UPOADING_FILE } from '../../../../src/domain/shared/constants'
import { uploadCaseUse } from '../../../../src/application/v1/useCases/upload'

import * as moduleCreatePath from '../../../../src/domain/upload/events/createPath'
import * as moduleStorageFile from '../../../../src/domain/upload/events/storageFile'
import * as moduleGetFileName from '../../../../src/domain/upload/events/getFileName'
import * as moduleGetFileExtension from '../../../../src/domain/upload/events/getFileExtension'

import { UploadResult } from 'src/domain/upload'
import { Image } from '../../../../src/infrastructure/image'

jest.mock('sharp')

jest.mock('fs', () => {
  return {
    __esModule: true,
    ...jest.requireActual('fs'),
  }
})

jest.mock('path', () => {
  return {
    __esModule: true,
    extname (v: string) {
      return v
    },
    join (v: string) {
      return v
    },
    basename (v: string) {
      return v
    }
  }
})

jest.mock('util', () => {
  return {
    __esModule: true,
    ...jest.requireActual('util'),
  }
})

const getFileExtensionSpy = jest.spyOn(moduleGetFileExtension, 'getFileExtension')
const getFileNameSpy = jest.spyOn(moduleGetFileName, 'getFileName')
const createPathSpy = jest.spyOn(moduleCreatePath, 'createPath')
const storageFileSpy = jest.spyOn(moduleStorageFile, 'storageFile')
const existsSyncSpy = jest.spyOn(fs, 'existsSync')
const mkdirSyncSpy = jest.spyOn(fs, 'mkdirSync')
const promisifySpy = jest.spyOn(util, 'promisify')

const resizeSpy = jest.spyOn(Image.prototype, 'resize')

describe('test upload', () => {
  beforeEach(() => {
    createPathSpy.mockReset()
    createPathSpy.mockClear()
    storageFileSpy.mockReset()
    storageFileSpy.mockClear()
    existsSyncSpy.mockReset()
    existsSyncSpy.mockClear()
    mkdirSyncSpy.mockReset()
    mkdirSyncSpy.mockClear()
    promisifySpy.mockReset()
    promisifySpy.mockClear()
    existsSyncSpy.mockReturnValue(false)
    mkdirSyncSpy.mockImplementation(() => '')
    resizeSpy.mockReset()
    resizeSpy.mockClear()
    resizeSpy.mockResolvedValue(Buffer.alloc(1))
    getFileNameSpy.mockReset()
    getFileNameSpy.mockClear()
    getFileNameSpy.mockReturnValue('')
    getFileExtensionSpy.mockReset()
    getFileExtensionSpy.mockClear()
    getFileExtensionSpy.mockReturnValue('')    
  })

  test('Shold be result success', async () => {
    createPathSpy.mockReturnValue('')
    storageFileSpy.mockResolvedValue(Buffer.alloc(1))

    const result = await uploadCaseUse({
      params: {
        area: 'user-1',
        file: 'image.jpg',
      },
      file: Buffer.alloc(10),
    })

    const response = result.response as UploadResult
    expect(result).toHaveProperty('response')
    expect(result).toHaveProperty('code')
    expect(response.area).toEqual('user-1')
    expect(response.file).toEqual('image.jpg')
    expect(result.code).toEqual(200)
  })

  test('Shold be error tring upload', async () => {
    createPathSpy.mockReturnValue('')
    storageFileSpy.mockImplementation(() => {
      throw new Error('some error')
    })
    const result = await uploadCaseUse({
      params: {
        area: 'user-1',
        file: 'image.jpg',
      },
      file: Buffer.alloc(10),
    })
    const error = result.response as AppError
    expect(error).toHaveProperty('error')
    expect(error.error.code).toEqual(ERROR_UPOADING_FILE)
  })
})
