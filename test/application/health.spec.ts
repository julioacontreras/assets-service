import { healthCaseUse } from '../../src/application/health'

type ReponseHealth = {
  message: string
  now: number
}

describe('test health', () => {
  test('Shold be result success', async () => {
    const data = healthCaseUse()
    const response = data.response as ReponseHealth
    expect(response).toHaveProperty('message')
    expect(response).toHaveProperty('at')
    expect(response.message).toEqual('works!')
  })
})
