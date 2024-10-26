import { Request } from 'express';

declare global {
  namespace Express {
    export interface Request {
      user?: {
        _id: Types.ObjectId;
        firstName: string;
        lastName: string;
        email: string;
      } | null;
    }
  }
}