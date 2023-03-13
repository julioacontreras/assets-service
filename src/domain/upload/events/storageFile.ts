import { createWriteStream } from 'fs'

export const storageFile = (
  pathName: string,
  fileName: string,
  data: Buffer,
): Promise<Buffer> => {
  return new Promise((resolve) => {
    const stream = createWriteStream(`${pathName}${fileName}`)
    stream.once('open', function () {
      stream.write(data)
      stream.end()
      resolve(data)
    })
  })
}
