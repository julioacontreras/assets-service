import { HTTPReturn } from '../adapters/serverHTTP/types'
import { statusHTTP } from '../adapters/serverHTTP'

/**
 * @api {get} /api/media/health Check health
 * @apiName Checj health
 * @apiGroup Media
 *
 * @apiSuccess {Response} return verything is okay
 */
export const healthCaseUse = (): HTTPReturn => {
  return {
    response: {
      message: 'works!',
      at: new Date().getTime(),
    },
    code: statusHTTP.OK,
  }
}
