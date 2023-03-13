export type FaceInfo = {
  faceCount: number
}

export type ResizeOptions = {
  height?: number
  width?: number
}

export type ImageType = {
  resize: (file: Buffer, options: ResizeOptions) => Promise<Buffer>
  removeBg: (file: Buffer) => Buffer
  faceInfo: (filePath: string) => Promise<FaceInfo> 
}
