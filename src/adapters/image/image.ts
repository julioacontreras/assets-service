
export type ResizeOptions = {
  height?: number
  width?: number
}

export type ImageType = {
  resize: (file: Buffer, options: ResizeOptions) => Promise<Buffer>
}
