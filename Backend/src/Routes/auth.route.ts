import { Router } from "express";
import { AuthController } from "../Controllers/auth.controller.ts";

const router = Router();

//New registration
router.post("/auth/register", AuthController.register)

export default router;