import { Router } from "express";
import { createUrl, getUrls } from "../controller/link.controller.js";
import { requireToken } from "../middlewares/requireToken.js";
import { bodyUrlValidator } from "../middlewares/validator.js";

const router = Router();

router.get("/", requireToken, getUrls);
router.post("/", requireToken, bodyUrlValidator, createUrl);

export default router;