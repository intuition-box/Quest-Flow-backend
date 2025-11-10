import { Router } from "express";
import { createQuest } from "@/controllers/admin.controller";

const router = Router();

router
  .post("/create-quest", createQuest);

export default router;