import { image } from '../../adapters/image'
import { getFileExtension } from './events/getFileExtension'
import { getFileName } from './events/getFileName'
import { storageFile } from './events/storageFile'

export const createImageResized = async (pathName: string, file: string, data: Buffer, prefix: string, width: number): Promise<string> => {
  console.log('a1')
  const fileNameBase = getFileName(file)
  console.log('a2')
  const ext = getFileExtension(file)
  console.log('a3')
  const fileName =  `${fileNameBase}-${prefix}${ext}`
  console.log('a4')
  const imaConverted = await image.resize(data, { width })
  console.log('a5')
  await storageFile(pathName, fileName, imaConverted)
  console.log('a6')
  return fileName
}
