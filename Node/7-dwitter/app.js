import express from "express";
import {} from "express-async-errors";
import morgan from "morgan";
import helmet from "helmet";

import tweetsRouter from "./routes/tweet.js";

const app = express();
app.use(express.json());
app.use(morgan("common"));
app.use(helmet());

app.use("/tweets", tweetsRouter);

app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).json({ message: "Something went wrong" });
});
app.listen(8080);
