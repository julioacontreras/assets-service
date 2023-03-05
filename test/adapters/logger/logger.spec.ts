import { setLogger, logger } from '../../../src/adapters/logger'
import { Logger } from '../../../src/adapters/logger/logger'

const loggerFake = {}

describe('test logger', () => {
  test('Shold be result success', async () => {
    setLogger(loggerFake as unknown as Logger)
    expect(loggerFake).toEqual(logger)
  })
})
