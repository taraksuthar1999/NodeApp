import { RequestHandler } from 'express';
import config from '../config';

import logger from '../logger';

/**
 * This router wrapper catches any error from async await
 * and throws it to the default express error handler,
 * instead of crashing the app
 *
 * @param handler Request handler to check for error
 */
const handleError = (handler: RequestHandler): RequestHandler => async (req, res, next): Promise<any> => {
  handler(req, res, next).catch((err: Error) => {
    if (config.isDevelopment) {
      logger.log({
        level: 'error',
        message: 'Error in request handler',
        error: err,
      });
    }
    next(err);
  });
};

export default handleError;
