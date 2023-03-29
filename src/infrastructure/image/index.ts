import sharp from 'sharp'
// import Jimp from 'jimp'

import { ResizeOptions } from 'src/adapters/image/image'
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
  
}

setImage(new Image())
