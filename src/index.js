import dotenv from "dotenv";
dotenv.config();

import path from "path";
import { fileURLToPath } from "url";

import http from "http";
import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";

import createSocket from "./modules/socket/index.js";

import DB from "./modules/DB.js";

import authRouter from "./routes/auth.js";
import apiRouter from "./routes/api.js";
import Routes from "./routes/index.js";

const app = express();
const httpServer = http.createServer(app);
const io = createSocket(httpServer);

const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use(express.static(path.join(__dirname, "..", "public")));
app.use(express.static(path.join(__dirname, "..", "client", "build")));
app.use(
  cors({
    origin: process.env.CLIENT,
  })
);
app.use(express.json());

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 50,
  message: {
    error: {
      status: 429,
      message: "Too many requests per minute",
    },
  },
});
app.use("/auth", limiter);
app.use("/api", limiter);

app.use("/auth", authRouter);

app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use("/api", apiRouter);
app.use("/", Routes);

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
});

const port = process.env.PORT || 8000;

DB()
  .then(() => {
    httpServer.listen({ port }, () => {
      console.log(`Server run on ${process.env.BACKEND}`);
    });
  })
  .catch(console.error);
