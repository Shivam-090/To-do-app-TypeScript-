// src/controllers/auth.controller.ts
import { Request, Response, NextFunction } from "express";
import crypto from "crypto";
import { User } from "../models/User.model";
import { signToken } from "../utils/jwt";

export const signup = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password, name } = req.body ?? {};

    if (!email || !password || !name) {
      return res.status(400).json({ message: "Missing name, email or password." });
    }

    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: "Email already exists" });

    const user = await User.create({ email, password, name });
    const token = signToken({ id: user._id });

    res.status(201).json({
      token,
      user: { id: user._id, email: user.email, name: user.name }
    });
  } catch (err) {
    next(err);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    try {
      console.log("[LOGIN] req.body keys:", req && typeof req.body === "object" ? Object.keys(req.body) : typeof req.body);
    } catch (e) {
      console.log("[LOGIN] could not inspect req.body:", e);
    }

    if (!req || !req.body) {
      return res.status(400).json({ message: "Request body missing" });
    }

    const { email, password } = req.body as { email?: string; password?: string };

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const match = await user.comparePassword(password);
    if (!match) return res.status(400).json({ message: "Invalid credentials" });

    const token = signToken({ id: user._id });

    res.json({
      token,
      user: { id: user._id, email: user.email, name: user.name }
    });
  } catch (err) {
    next(err);
  }
};

export const forgotPassword = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email } = req.body ?? {};
    if (!email) return res.status(400).json({ message: "Email is required" });

    const user = await User.findOne({ email });
    if (!user) return res.json({ message: "If this email exists, reset instructions sent." });

    const token = crypto.randomBytes(32).toString("hex");
    user.resetPasswordToken = token;
    user.resetPasswordExpires = new Date(Date.now() + 3600 * 1000);
    const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${token}&id=${user._id}`;
    await user.save();

    
    res.json({ message: "Password reset link generated",
      resetLink,
     });
  } catch (err) {
    next(err);
  }
};

export const resetPassword = async (req: Request, res: Response, next: NextFunction) => {
  try {
 
    const { userId, token, newPassword } = req.body ?? {};
    if (!userId || !token || !newPassword) return res.status(400).json({ message: "Missing required fields" });

    const user = await User.findById(userId);
    if (
      !user ||
      user.resetPasswordToken !== token ||
      !user.resetPasswordExpires ||
      user.resetPasswordExpires < new Date()
    ) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    user.password = newPassword;
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;
    await user.save();

    res.json({ message: "Password reset successful" });
  } catch (err) {
    next(err);
  }
};
