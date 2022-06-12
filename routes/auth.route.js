import { Router } from "express";
import { infoUser, login, register } from "./auth.controller.js";
import { body } from "express-validator";
import { validationResultExpress } from "../middlewares/validationResultExpress.js";
import { requireToken } from "../middlewares/requireToken.js";

const router = Router();

router.post('/register', [
        body('email', "Email format incorrect.")
            .trim()
            .isEmail()
            .normalizeEmail(),
        body('password', "Password format incorrect.")
            .trim()
            .isLength({min: 6})
            .custom((value, {req}) => {
                if (value !== req.body.repassword) {
                    throw new Error("[ERROR] - Passwords do not match.")
                }
                return value;
            })],
    validationResultExpress,
    register
);

router.post('/login', [
        body('email', "Email format incorrect.")
            .trim()
            .isEmail()
            .normalizeEmail(),
        body('password', "Password format incorrect.")
            .trim()
            .isLength({min: 6})],
    validationResultExpress,
    login
);

router.get('/protected', requireToken, infoUser)

export default router;