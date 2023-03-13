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
  const pathName = await createOriginalImage(area, file, data)
  const fileSmall = await createImageResized(pathName, file, data, 'xs', 150)
  const fileExtraSmall = await createImageResized(pathName, file, data, 's', 60)
  // const fileNoBG = await createImageWithoutBackground(pathName, file, data)
  const details = await createImageDetails(area, file)

  return {
    area,
    file,
    fileSmall,
    fileExtraSmall,
    fileNoBG: '',
    details
  }
}
