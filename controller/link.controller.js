import { Url } from "../models/Url.js";
import { nanoid } from "nanoid";


export const getUrls = async (req, res) => {
    try {
        const urls = await Url.find({uid: req.uid})
        return res.json({urls});
    } catch (e) {
        return res.status(500).json({error: 'Error'});
    }
}

export const createUrl = async (req, res) => {
    try {
        const {longUrl} = req.body;
        const url = new Url({
            longUrl,
            nanoUrl: nanoid(6),
            uid: req.uid
        });

        const newUrl = await url.save();

        return res.status(201).json({newUrl});
    } catch (e) {
        return res.status(500).json({error: 'Error'});
    }
}