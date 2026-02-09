import { Request } from "express";

export interface AuthUser {
  _id: string;
  name: string;
  email: string;
}

// Extend the global Express namespace to add custom properties to the Request interface
declare global {
  namespace Express {
    // Extend the existing Request interface to include a 'user' property
    interface Request {
      user?: AuthUser; // Optional 'user' property attached by auth middleware
    }
  }
}
