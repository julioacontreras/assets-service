import { serverHTTP } from '../adapters/serverHTTP'
import { uploadCaseUse } from '../application/useCases/upload'
import { downloadCaseUse } from '../application/useCases/download'

function useRoutes() {
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
}

export function startApp() {
  useRoutes()

  serverHTTP.run()
}
