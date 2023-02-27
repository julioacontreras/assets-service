import * as dotenv from 'dotenv'
dotenv.config()

import './infrastructure/logger'
import './infrastructure/serverHttpFastify'

import { startApp } from './application'

startApp()
