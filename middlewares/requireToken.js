import jwt from "jsonwebtoken";

export const requireToken = (req, res, next) => {
    try {
        let token = req.headers?.authorization;
        if (!token) throw new Error("[ERROR] - No token generated.");

        token = token.split(' ')[1];

        const payload = jwt.verify(token, process.env.JWT_SECRET);

        req.uid = payload.uid;


        next();
    } catch (e) {
        console.log(e);

        const TokenVerificationErrors = {
            "invalid signature": "Sign of JWT is not valid",
            "jwt expired": "JWT Expired",
            "invalid token": "Token not valid",
            "No Bearer": "Use the correct Bearer format",
            "jwt malformed": "JWT Malformed"
        };

        return res
            .status(401)
            .send({error: TokenVerificationErrors[e.message]});
    }
}