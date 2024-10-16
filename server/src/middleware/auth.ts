import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayload {
  username: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

 const authenticateToken = (req: Request, res: Response, next: NextFunction): void | Response => {
  // TODO: verify the token exists and add the user data to the request object
 const authHeader = req.headers['authorization'];
 const token = authHeader && authHeader.split(' ')[1];

 if (token == null) {
  return res.sendStatus(401);
 }

 jwt.verify(token, process.env.JWT_SECRET_KEY as string, (err, user) => {
  if (err) {
    return res.sendStatus(403);
  }

  req.user = user as JwtPayload;
  return next();
  });
};

export { authenticateToken };