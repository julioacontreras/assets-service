import { setServerHTTP, serverHTTP } from '../../../src/adapters/serverHTTP'
import { ServerHTTP } from '../../../src/adapters/serverHTTP/serverHTTP'

const serverFake = {}

describe('test server HTTP', () => {
  test('Shold be result success', async () => {
    setServerHTTP(serverFake as unknown as ServerHTTP)
    expect(serverFake).toEqual(serverHTTP)
  })
})
