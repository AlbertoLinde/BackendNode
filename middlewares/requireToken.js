import jwt from "jsonwebtoken";
import { tokenVerificationErrors } from "../utils/tokenManager.js";

export const requireToken = (req, res, next) => {
    try {
        let token = req.headers?.authorization;
        if (!token) throw new Error("[ERROR] - No token generated.");

        token = token.split(' ')[1];

        const payload = jwt.verify(token, process.env.JWT_SECRET);

        req.uid = payload.uid;


        next();
    } catch (e) {
        return res
            .status(401)
            .send({error: tokenVerificationErrors[e.message]});
    }
}