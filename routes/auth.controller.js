import { User } from "../models/User.js";
import { generateRefreshToken, generateToken } from "../utils/tokenManager.js";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
    const {email, password} = req.body;
    try {
        let user = await User.findOne({email})
        if (user) throw {code: 11000}; // Jump directly to catch.
        user = new User({email, password});
        await user.save();
        return res.status(201).json({ok: true});
    } catch (e) {
        console.log(e);
        if (e.code === 11000) {
            return res.status(400).json({error: "[ERROR] - User already exists."});
        }
    }
    return res.status(500).json({error: "Server error."});
}

export const login = async (req, res) => {
    try {
        const {email, password} = req.body;

        let user = await User.findOne({email});
        if (!user)
            return res.status(403)
                .json({error: "[ERROR] - Credentials Incorrect"});

        const passwordResponse = user.comparePassword(password);
        if (!passwordResponse)
            return res.status(403)
                .json({error: "[ERROR] - Pass (Change to Credential) Incorrect"});

        const {token, expiresIn} = generateToken(user.id);
        generateRefreshToken(user.id, res)

        return res.json({token, expiresIn});
    } catch (e) {
        console.log(e)
        return res.status(500).json({error: "Server error."});
    }
}

export const infoUser = async (req, res) => {
    try {
        // Find the element in the Database using the payload (payload contains all user ID)
        // lean() return just an object
        const user = await User.findById(req.uid).lean();
        return res.json({email: user.email, uid: user.uid});
    } catch (e) {
        return res.status(500).json({error: "Server error."});
    }
}

export const refreshToken = (req, res) => {
    try {
        const refreshTokenCookie = req.cookies.refreshToken;

        if (!refreshTokenCookie) throw new Error("No bearer ")

        const {uid} = jwt.verify(refreshTokenCookie, process.env.JWT_REFRESH);
        const {token, expiresIn} = generateToken(uid);

        return res.json({token, expiresIn});
    } catch (e) {
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

