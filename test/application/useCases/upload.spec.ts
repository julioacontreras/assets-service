

import fs from 'fs'
import path from 'path'
import util from 'util'

import { AppError } from '@/adapters/serverHTTP/types'
import { ERROR_UPOADING_FILE } from '@/domain/constants'
import { uploadCaseUse } from '../../../src/application/useCases/upload'
import * as upload from '../../../src/application/useCases/upload'

const uploadThisSpy = jest.spyOn(upload, 'uploadThis')
const existsSyncSpy = jest.spyOn(fs, 'existsSync')
const mkdirSyncSpy = jest.spyOn(fs, 'mkdirSync')
const basenameSpy = jest.spyOn(path, 'basename')
const promisifySpy = jest.spyOn(util, 'promisify')

describe('test upload', () => {
    beforeEach(() => {
        uploadThisSpy.mockReset()
        uploadThisSpy.mockClear()
        existsSyncSpy.mockReset()
        existsSyncSpy.mockClear()
        mkdirSyncSpy.mockReset()
        mkdirSyncSpy.mockClear()
        basenameSpy.mockReset()
        basenameSpy.mockClear()
        promisifySpy.mockReset()
        promisifySpy.mockClear()
        basenameSpy.mockReturnValue('')
        existsSyncSpy.mockReturnValue(false)
        mkdirSyncSpy.mockImplementation(() => '')
    })

    test('Shold be result success', async () => {
        uploadThisSpy.mockReturnValue()
        const result = uploadCaseUse({
            params: {
                area: 'user-1',
                file: 'image.jpg'
            },
            file: Buffer.alloc(10)
        })

        const response = result.response as upload.MediaResponse
        
        expect(result).toHaveProperty('response')
        expect(result).toHaveProperty('code')
        expect(response.area).toEqual('user-1')
        expect(response.file).toEqual('image.jpg')
        expect(result.code).toEqual(200)
    })

    test('Shold be error tring upload', () => {
        uploadThisSpy.mockImplementation(() => {
            throw new Error('some error')
        })
        const result = uploadCaseUse({
            params: {
                area: 'user-1',
                file: 'image.jpg'
            },
            file: Buffer.alloc(10)
        })
        const error = result.response as AppError
        expect(error).toHaveProperty('error')
        expect(error.error.code).toEqual(ERROR_UPOADING_FILE)
    })

})
