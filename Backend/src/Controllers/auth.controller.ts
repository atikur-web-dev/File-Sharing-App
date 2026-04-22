import type { Request, Response, NextFunction } from "express";
import { registerService } from "../Services/register.service.ts";
import { CreateResponse } from "../Utils/success/httpSuccess.ts";

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

export const AuthController = {
    register,
}