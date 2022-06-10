import mongoose from "mongoose";

try {
    await mongoose.connect(process.env.URI_MONGO);
    console.log("Connect to DB - OK");
} catch (e) {
    console.log("[ERROR] Can't connect to DB");
}

