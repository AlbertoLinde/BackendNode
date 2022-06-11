import { User } from "../models/User.js";

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
            return res.status(400).json({error: "[ERROR] - User already exists."})
        }
    }
    return res.status(500).json({error: "Server error."});
}

export const login = (req, res) => {
    res.json({ok: true});
}
