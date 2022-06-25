import mongoose from "mongoose";

const {Schema, model} = mongoose;

const urlSchema = new Schema({
    longUrl: {
        type: String,
        required: true,
        trim: true,
    },
    nanoUrl: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    uid: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    }
});

export const Url = model('Url', urlSchema);