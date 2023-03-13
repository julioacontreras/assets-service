import * as dotenv from 'dotenv'
dotenv.config()

import './infrastructure/logger'
import './infrastructure/serverHttpFastify'
import './infrastructure/image'

import { startApp } from './application'

startApp()
