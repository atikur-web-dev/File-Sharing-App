import type { Request, Response, NextFunction, CookieOptions } from "express";
import { registerService } from "../Services/register.service.ts";
import { CreateResponse, OkResponse } from "../Utils/success/httpSuccess.ts";
import { loginService } from "../Services/login.service.ts";
import { config } from "../Config/config.ts";

const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newUser = await registerService(req.body);
    res
      .status(201)
      .json(new CreateResponse(newUser, "User registered successfully"));
  } catch (error) {
    next(error);
  }
};

// Login (updated version)
const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { user, accessToken, refreshToken } = await loginService(req.body);

    const cookieOptions: CookieOptions = {
      httpOnly: true,
      secure: config.nodeEnv === "production",
      sameSite: "lax",
    };

    res.cookie("accessToken", accessToken, {
      ...cookieOptions,
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    });

    res.cookie("refreshToken", refreshToken, {
      ...cookieOptions,
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });

    res.status(200).json(new OkResponse({ user }, "Login Successfully"));
  } catch (error) {
    next(error);
  }
};

export const AuthController = {
  register,
  login,
};
