import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User, { UserDocument } from "../models/user.model";

const signJwt = (user: UserDocument): string => {
  const token = jwt.sign(
    {
      id: user._id,
      isAdmin: user.isAdmin,
    },
    process.env.JWT_SEC || 'abhishek1234567896324354567',
    { expiresIn: "3d" }
  );
  return token;
};

const removePassword = (user: UserDocument): Omit<UserDocument, "password"> => {
  const { password, ...rest } = user._doc;
  return rest;
};

export default {
  register: async (req: Request, res: Response) => {
    try {
      const { email, username, password } = req.body;
      const salt = await bcrypt.genSalt(10);
      const hashPass = await bcrypt.hash(password, salt);
      const newUser = new User({
        username,
        email,
        password: hashPass,
      });
      const user = await newUser.save();
      const token = signJwt(user);
      const userData = removePassword(user);
      res
        .status(200)
        .json({ ...userData, token, message: "User registered successfully." });
    } catch (error) {
      res.status(500).json(error);
    }
  },
  login: async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json("Invalid credentials");
      }
      const validatePass = await bcrypt.compare(password, user.password);
      if (!validatePass) {
        return res.status(400).json("Invalid credentials");
      }
      const token = signJwt(user);
      const userData = removePassword(user);
      res.status(200).json({ ...userData, token, message: "User logged in successfully." });
    } catch (error) {
      res.status(500).json({ message: "Something went wrong", error });
    }
  },
};
