import jwt from "jsonwebtoken";
import { tokenVerificationErrors } from "../utils/tokenManager.js";

export const requireRefreshToken = (req, res, next) => {
    try {
        const refreshTokenCookie = req.cookies.refreshToken;

        if (!refreshTokenCookie) throw new Error("Token doesnt exist.")

        // If the refresh token exists, we get the UID from the PAYLOAD inside the
        // refresh Token and I set the UID inside the request.
        const {uid} = jwt.verify(refreshTokenCookie, process.env.JWT_REFRESH);

        req.uid = uid;
        next();
    } catch (e) {
        res.status(401).json({error: tokenVerificationErrors[e.message]})
    }
}