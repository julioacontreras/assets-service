import { FaceInfo } from 'src/adapters/image/image'
import { image } from '../../adapters/image'

export const createImageDetails = async (area: string, file: string): Promise<FaceInfo> => {
  return image.faceInfo(`${area}/${file}`)
}
