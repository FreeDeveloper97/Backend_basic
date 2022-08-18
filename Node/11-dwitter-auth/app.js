import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import "express-async-errors";

import tweetsRouter from "./routes/tweet.js";
import authRouter from "./routes/auth.js";

const app = express();
app.use(express.json());
app.use(morgan("common"));
app.use(helmet());
app.use(cors());

app.use("/tweets", tweetsRouter);
app.use("/auth", authRouter);

app.use((req, res, next) => {
  res.status(404).json({ message: "Something went wrong" });
});

app.use((error, req, res, next) => {
  console.error(error);
  res.sendStatus(500);
});

app.listen(8080);
