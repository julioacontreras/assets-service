import fs from 'fs'

import { downloadCaseUse } from '../../../src/application/useCases/download'

const readFileSyncSpy = jest.spyOn(fs, 'readFileSync')

describe('test download request', () => {
    beforeEach(() => {
        readFileSyncSpy.mockReset()
        readFileSyncSpy.mockClear()
        readFileSyncSpy.mockReturnValue('1234')
    })

    test('Shold be result success', async () => {
        const response = await downloadCaseUse({
            params: {
                area: 'user-1',
                file: 'image.jpg'
            }
        })
        expect(response).toHaveProperty('response')
        expect(response).toHaveProperty('code')
        expect(response.response).toEqual('1234')
        expect(response.code).toEqual(200)
    })
})