import { NextFunction, Request, Response } from "express";

export default (schema: Record<string, any>) => {
  return (req: Request, res: Response, next: NextFunction) => {};
};
