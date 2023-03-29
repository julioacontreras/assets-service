import path from 'path'

export const getFileName = (file: string): string => {
  return path.parse(file).name
}
