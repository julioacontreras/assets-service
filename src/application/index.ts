import { serverHTTP } from '../adapters/serverHTTP'
import { uploadCaseUse } from './v1/useCases/upload'
import { downloadCaseUse } from './v1/useCases/download'
import { healthCaseUse } from './health'

export function startApp () {
  serverHTTP.add('upload', {
    useCase: uploadCaseUse,
    route: '/api/v1/media/:area/:file',
    method: 'upload',
  })

  serverHTTP.add('download', {
    useCase: downloadCaseUse,
    route: '/api/v1/media/:area/:file',
    method: 'download',
  })

  serverHTTP.add('health', {
    useCase: healthCaseUse,
    route: '/api/media/health',
    method: 'get',
  })

  serverHTTP.run()
}
