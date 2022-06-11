import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
        index: {unique: true}
    },
    password: {
        type: String,
        required: true
    }
});

// Before save anything use PRE
userSchema.pre('save', async function (next) {
    const user = this;
    if (!user.isModified('password')) return next;

    try {
        const jumps = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, jumps);
        next();
    } catch (e) {
        console.log(e);
        throw new Error('[ERROR] - BCrypt Password generation failed.')
    }
});

userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
}


export const User = mongoose.model('user', userSchema);