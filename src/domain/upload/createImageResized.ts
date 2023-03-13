import { image } from '../../adapters/image'
import { getFileExtension } from './events/getFileExtension'
import { getFileName } from './events/getFileName'
import { storageFile } from './events/storageFile'

export const createImageResized = async (pathName: string, file: string, data: Buffer, prefix: string, width: number): Promise<string> => {
  const fileNameBase = getFileName(file)
  const ext = getFileExtension(file)
  const fileName =  `${fileNameBase}-${prefix}${ext}`
  const imaConverted = await image.resize(data, { width })
  await storageFile(pathName, fileName, imaConverted)
  return fileName
}
