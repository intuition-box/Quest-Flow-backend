import { Router } from "express";
import { home } from "@/controllers/app.controller";

const router = Router();

router.get("/", home);

export default router;