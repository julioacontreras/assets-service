import { createImageDetails } from './createImageDetails'
import { createImageResized } from './createImageResized'
import { createOriginalImage } from './createOriginalImage'

export type UploadResult = {
  area: string
  file: string
  fileExtraSmall: string
  fileSmall: string
  fileNoBG: string
  details: object
} 

export const upload = async (area: string, file: string, data: Buffer): Promise<UploadResult> => {
  console.log('s1')
  const pathName = await createOriginalImage(area, file, data)
  console.log('s2')
  const fileSmall = await createImageResized(pathName, file, data, 'xs', 150)
  console.log('s3')
  const fileExtraSmall = await createImageResized(pathName, file, data, 's', 60)
  console.log('s4')
  // const fileNoBG = await createImageWithoutBackground(pathName, file, data)
  const details = await createImageDetails(area, file)
  console.log('s5')

  return {
    area,
    file,
    fileSmall,
    fileExtraSmall,
    fileNoBG: '',
    details
  }
}
