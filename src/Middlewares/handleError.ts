import { NextFunction, Request, Response } from 'express';

class HandleError {
  public static handle(error: Error, _req: Request, res: Response, next: NextFunction) {
    if (error) return res.status(500).json({ message: error.message });
    res.status(500).json({ message: 'Invalid Fields!' });
    next();
  }
}

export default HandleError;
