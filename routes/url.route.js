import { Router } from "express";
import { createUrl, getUrl, getUrls, removeUrl, updateLink } from "../controller/link.controller.js";
import { requireToken } from "../middlewares/requireToken.js";
import { bodyUrlValidator, paramsUrlValidator } from "../middlewares/validator.js";

const router = Router();

router.get("/", requireToken, getUrls);
router.get("/:id", requireToken, paramsUrlValidator, getUrl);
router.post("/", requireToken, bodyUrlValidator, createUrl);
router.delete("/:id", requireToken, paramsUrlValidator, removeUrl);
router.patch("/:id", requireToken, paramsUrlValidator, bodyUrlValidator, updateLink);

export default router;