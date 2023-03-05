import winston from 'winston'

import { setLogger } from '../../adapters/logger'

const loggerWiston = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'media-service' },
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
})

if (process.env.NODE_ENV !== 'production') {
  loggerWiston.add(new winston.transports.Console({
    format: winston.format.simple(),
  }))
}

const logger = {
  info (message: string) {
    loggerWiston.info(message)
  },
  error (message: string) {
    loggerWiston.error(` 💩 ${message}`)
  }
}

setLogger(logger)
