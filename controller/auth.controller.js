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

        const {token, expiresIn} = generateToken(user.id);
        generateRefreshToken(user.id, res)

        return res.status(201).json({token, expiresIn});
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
        const {token, expiresIn} = generateToken(req.uid);
        return res.json({token, expiresIn});
    } catch (e) {
        console.log(e);
        return res.status(500).json({error: "Server Error"})
    }
}

export const logout = (req, res) => {
    res.clearCooke('refreshToken');
    res.json({ok: true});
}