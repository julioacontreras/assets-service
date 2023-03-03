import * as HttpStatus from 'http-status'
export const statusHTTP = HttpStatus

import { ServerHTTP } from './serverHTTP'

export let serverHTTP: ServerHTTP

export function setServerHTTP (newServer: ServerHTTP) {
  serverHTTP = newServer
}
