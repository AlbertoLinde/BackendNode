import { Router } from "express";
import { createUrl, getUrl, getUrls, removeUrl } from "../controller/link.controller.js";
import { requireToken } from "../middlewares/requireToken.js";
import { bodyUrlValidator } from "../middlewares/validator.js";

const router = Router();

router.get("/", requireToken, getUrls);
router.get("/:id", requireToken, getUrl);
router.post("/", requireToken, bodyUrlValidator, createUrl);
router.delete("/:id", requireToken, removeUrl);

export default router;