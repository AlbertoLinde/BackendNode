import { Router } from "express";
import { infoUser, login, logout, refreshToken, register } from "../controller/auth.controller.js";
import { requireToken } from "../middlewares/requireToken.js";
import { requireRefreshToken } from "../middlewares/requireRefreshToken.js";
import { bodyLoginValidator, bodyRegisterValidator } from "../middlewares/validator.js";

const router = Router();

router.post('/register', bodyRegisterValidator, register);

router.post('/login', bodyLoginValidator, login);

router.get('/protected', requireToken, infoUser);
router.get('/refresh', requireRefreshToken, refreshToken)
router.get('/logout', logout);

export default router;