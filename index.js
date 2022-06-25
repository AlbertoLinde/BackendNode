import 'dotenv/config'
import express from "express";
import "./database/connectdb.js";
import authRouter from "./routes/auth.route.js";
import urlRouter from "./routes/url.route.js";

const app = express();

// Middlewares
app.use(express.json());
// TODO: Cookie Parser
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/urls", urlRouter);


const PORT = process.env.PORT || 5000;
app.listen(PORT);