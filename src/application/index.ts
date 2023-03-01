import { serverHTTP } from '../adapters/serverHTTP'
import { uploadCaseUse } from '../application/useCases/upload'
import { downloadCaseUse } from '../application/useCases/download'

export function startApp () {
  serverHTTP.add('upload', {
    useCase: uploadCaseUse,
    route: '/api/media/:area/:file',
    method: 'upload',
  })

  serverHTTP.add('download', {
    useCase: downloadCaseUse,
    route: '/api/media/:area/:file',
    method: 'download',
  })

  serverHTTP.run()
}
