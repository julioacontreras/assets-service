import path from 'path'

export const getFileExtension = (file: string): string => {
  return path.extname(file)
}
