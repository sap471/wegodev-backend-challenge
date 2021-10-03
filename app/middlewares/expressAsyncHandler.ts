import { NextFunction, Request, RequestHandler, Response } from "express";

export default <T extends any>(
    handler: (req: Request, res: Response) => Promise<T> | T
  ): RequestHandler =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      return await handler(req, res);
    } catch (error) {
      next(error);
    }
  };
