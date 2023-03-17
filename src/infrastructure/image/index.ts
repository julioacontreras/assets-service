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
    // TODO: create apache kafka to do this
    return Buffer.alloc(1)
  }

  public async faceInfo (filePath: string): Promise<FaceInfo> {
    // TODO: create apache kafka to do this
    /*
    const imgPath = process.env.FACE_RECOGNITION_IMG_PATH || ''
    const filePathPython = `${imgPath}${filePath}` 
    const response = await axios.post(process.env.FACE_RECOGNITION_URL || 'no_path', { src: filePathPython })
    */
    return {
      faceCount: 0// Number(response.data.faceCount)
    }
  }
}

setImage(new Image())
