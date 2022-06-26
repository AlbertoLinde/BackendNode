import { body, param, validationResult } from "express-validator";
import axios from "axios";

export const validationResultExpress = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    // Continue with the next middleware (execution)
    next();
}

export const paramsUrlValidator = [
    param('id', "Format not valid")
        .trim()
        .notEmpty()
        .escape(),
    validationResultExpress
];

export const bodyUrlValidator = [
    body("longUrl", "Wrong Email Format")
        .trim()
        .notEmpty()
        .custom(async value => {
            try {
                await axios.get(value);
                return value;
            } catch (e) {
                console.log(e);
                throw new Error("ERROR: Not found LongLink");
            }
        }),
    // .exists(),
    validationResultExpress
];

export const bodyRegisterValidator = [
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
        }),
    validationResultExpress
];

export const bodyLoginValidator = [
    body('email', "Email format incorrect.")
        .trim()
        .isEmail()
        .normalizeEmail(),
    body('password', "Password format incorrect.")
        .trim()
        .isLength({min: 6}),
    validationResultExpress
];