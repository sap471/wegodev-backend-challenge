import { ValidationError } from "class-validator";
import { NextFunction, Request, Response } from "express";

export class NotFoundError extends Error {}

export default (
  err: Error | any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let message = "Internal Server Error";
  res.statusCode = 500;
  if (err instanceof NotFoundError) {
    res.statusCode = 404;
    message = err.message;
  } else if (err instanceof ValidationError) {
    res.statusCode = 400;
    message = err.toString()
  }

  return res.json({
    status: false,
    message,
  });
};
