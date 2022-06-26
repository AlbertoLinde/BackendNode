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

export const getUrl = async (req, res) => {
    try {
        const {id} = req.params;
        const url = await Url.findById(id);

        if (!url) return res.status(400).json({error: 'Url doesnt exist'});

        // Check if the correspond to the user
        if (url.uid.equals(req.uid)) return res.status(401).json({error: 'This urls is not yours'})

        return res.json({url});
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

export const removeUrl = async (req, res) => {
    try {
        const {id} = req.params;
        const url = await Url.findById(id);

        if (!url) return res.status(400).json({error: 'Url doesnt exist'});

        // Check if the correspond to the user
        if (url.uid.equals(req.uid)) return res.status(401).json({error: 'This urls is not yours'})

        await url.remove();

        return res.json({url});
    } catch (e) {
        return res.status(500).json({error: 'Error'});
    }
}

export const updateLink = async (req, res) => {
    try {
        const {id} = req.params;
        const {longUrl} = req.body;
        const url = await Url.findById(id);

        if (!url) return res.status(400).json({error: 'Url doesnt exist'});

        // Check if the correspond to the user
        if (url.uid.equals(req.uid)) return res.status(401).json({error: 'This urls is not yours'})

        url.longUrl = longUrl;
        await url.save();

        return res.json({url});
    } catch (e) {
        return res.status(500).json({error: 'Error'});
    }
}