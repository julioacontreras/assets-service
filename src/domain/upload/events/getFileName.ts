import path from 'path'

export const getFileName = (file: string): string => {
  return path.basename(file)
}
