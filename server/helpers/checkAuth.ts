import { Request, Response, NextFunction } from 'express';

const checkAuth = (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.redirect('/');
};

export default checkAuth;
