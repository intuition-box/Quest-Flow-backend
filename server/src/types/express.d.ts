import type { Request, Response } from "express";

declare global {

  interface GlobalRequest extends Request {
    id?: string
  };

  type GlobalResponse = Response;
}