import 'dotenv/config'
import express from "express";
import "./database/connectdb.js";

const app = express();
const PORT = process.env.PORT || 5000;


app.listen(PORT);