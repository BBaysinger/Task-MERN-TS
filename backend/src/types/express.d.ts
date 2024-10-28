import { Request } from 'express';
import { UserDocument } from '../models/userModel'; // Adjust path as needed

declare global {
  namespace Express {
    interface Request {
      user?: UserDocument;
    }
  }
}