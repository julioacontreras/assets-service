import * as Joi from 'joi'
import { ValidationError } from 'joi'
import { ERROR_INVALID_PARAMS } from '../constants'

export const getSchemaRequest = () => {
  return Joi.object({
    area: Joi.string().required(),
    file: Joi.string().pattern(new RegExp('^.*.(jpg|JPG|png|PNG)$')).required(),
  })
}

export const prepareErrorParamsRequest = (error: ValidationError) => {
  return {
    error: {
      code: ERROR_INVALID_PARAMS,
      message: error.details[0].message,
    },
  }
}
