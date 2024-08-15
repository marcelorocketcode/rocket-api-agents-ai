import { validateAuthorizationToken } from '@utils/jsonwebtoken';
import logger from '@utils/logger';
import { StatusMsg } from '@utils/response';
import { Request, Response, NextFunction } from 'express';

export const authGuard = (req: Request, res: Response, next: NextFunction) => {
  try {
    const Authorization = req.headers.Authorization as string | undefined;
    if (!Authorization) throw 'Unauthorized';

    const token = Authorization.replace("Bearer ", "");
    const user = validateAuthorizationToken(token);

    logger.info("User %s autheticated successful", user.name);

    return next();
  } catch {
    return res.status(401).json({
      message: 'Unauthorized',
      result: null,
      status_code: 401,
      status_message: StatusMsg.ERROR
    })
  }
}