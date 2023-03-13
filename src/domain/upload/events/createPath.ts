import { existsSync, mkdirSync } from 'fs'

const prepareDestinyPath = (area: string): string => {
  return `./uploads/${area}/`
}

export const createPath = (area: string): string => {
  const pathName = prepareDestinyPath(area)

  if (!existsSync(pathName)) {
    mkdirSync(pathName, { recursive: true })
  }

  return pathName
}
