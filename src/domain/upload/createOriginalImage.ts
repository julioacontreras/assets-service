import { createPath } from './events/createPath'
import { storageFile } from './events/storageFile'

export const createOriginalImage = async (
  area: string,
  file: string,
  data: Buffer,
): Promise<string> => {
  const pathName = createPath(area)
  storageFile(pathName, file, data)
  return pathName
}
