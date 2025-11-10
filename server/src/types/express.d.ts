import type { NextFunction, Request, Response } from "express";

declare global {

  interface GlobalRequest extends Request {
    id?: string
  };

  type GlobalResponse = Response;

  type GlobalNextFunction = NextFunction;
}