import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import User, { IUser } from "models/userModel";

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User Exists");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const user: IUser = await User.create({ name, email, password: hashedPassword });
  if (user) {
    res
      .status(201)
      .json({
        _id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        token: generateJWTtoken(user._id),
      });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      token: generateJWTtoken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid data");
  }
});

const getCurrentUser = asyncHandler(async (req: Request, res: Response) => {
  const user: IUser | null = await User.findById(req.user?._id);

  if (!user) {
    res.status(404).json({ message: "User not found" });
    return;
  }

  const { _id, firstName, lastName, email } = user;
  res.status(200).json({ id: _id, name, email });
});

const generateJWTtoken = (id: string): string => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in environment variables.");
  }

  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "5d" });
};

export { registerUser, loginUser, getCurrentUser };
