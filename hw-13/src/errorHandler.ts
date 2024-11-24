import {
  Middleware,
  ExpressErrorMiddlewareInterface,
} from "routing-controllers";
import { Request, Response, NextFunction } from "express";
import { CustomError } from "./customErrorType";

@Middleware({ type: "after" })
export class CustomErrorHandler implements ExpressErrorMiddlewareInterface {
  error(error: any, request: Request, response: Response, next: NextFunction) {
    if (error instanceof CustomError) {
      response.status(error.httpCode).json({ msg: error.message });
    } else {
      response
        .status(error.httpCode || 500)
        .json({ msg: "Internal server error" });
    }
  }
}
