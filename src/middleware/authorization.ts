import { Request, Response, NextFunction } from 'express';

import logger from '@utils/logger';
import { StatusMsg } from '@utils/response';
import { validateAuthorizationToken } from '@utils/jsonwebtoken';

export const authGuard = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authorization = req.headers.authorization as string | undefined;

    logger.info("Authorization found: %s", authorization);

    if (!authorization) throw 'Unauthorized';

    const token = authorization.replace("Bearer ", "");
    const user = validateAuthorizationToken(token);

    logger.info("User %s authenticated successful", user.name);

    return next();
  } catch (error) {
    logger.error("Error found: %s", JSON.stringify(error));
  
    return res.status(401).json({
      message: 'Unauthorized',
      result: null,
      status_code: 401,
      status_message: StatusMsg.ERROR
    })
  }
}