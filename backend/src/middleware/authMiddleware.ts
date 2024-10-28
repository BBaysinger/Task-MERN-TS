import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";

import User from "models/userModel";
import { Request, Response } from 'express';

export const protect = asyncHandler(async (req: Request, res: Response, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      const token = req.headers.authorization.split(" ")[1];

      if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET is not defined in environment variables.");
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET) as { id: string };
      const user = await User.findById(decoded.id).select("-password");

      if (!user) {
        res.status(401);
        throw new Error("User not found");
      }

      req.user = { _id: user._id, firstName: user.firstName, lastName: user.lastName, email: user.email };

      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error("You are not authorized");
    }
  } else {
    res.status(401);
    throw new Error("Authorization header is missing");
  }
});

export default protect;
