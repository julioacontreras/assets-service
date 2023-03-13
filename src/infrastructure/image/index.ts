import sharp from 'sharp'
// import Jimp from 'jimp'
import axios from 'axios'

import { FaceInfo, ResizeOptions } from 'src/adapters/image/image'
import { setImage } from '../../adapters/image'

export class Image {

  public async resize (file: Buffer, options: ResizeOptions): Promise<Buffer> {
    const res = await sharp(file).
      resize({
        width: options.width,
        height: options.height
      }).
      toBuffer()
    return res
  }
  
  public removeBg (filePath: Buffer): Buffer {
    return Buffer.alloc(1)
  }

  public async faceInfo (filePath: string): Promise<FaceInfo> {
    const filePathPython = `../../uploads/${filePath}` 
    const response = await axios.post(process.env.FACE_RECOGNITION_URL || 'no_path', { src: filePathPython })
    return {
      faceCount: Number(response.data.faceCount)
    }
  }
}

setImage(new Image())
