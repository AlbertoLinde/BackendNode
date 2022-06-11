import 'dotenv/config'
import express from "express";
import "./database/connectdb.js";
import authRouter from "./routes/auth.route.js";

const app = express();

// Middlewares
app.use(express.json());
app.use("/api/v1", authRouter);


const PORT = process.env.PORT || 5000;
app.listen(PORT);