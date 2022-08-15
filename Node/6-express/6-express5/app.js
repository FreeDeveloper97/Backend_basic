import express from "express";
import fs from "fs";
import fsAsync from "fs/promises";

const app = express();

app.use(express.json());

app.get("/file1", (req, res) => {
  // 1. 비동기 함수의 경우 err발생시 내부처리를 해야한다
  // fs.readFile('/file1.txt', (err, data) => {
  //   if (err) {
  //     res.sendStatus(404);
  //   }
  // });

  // 2. 동기함수의 경우 err 발생시 try catch 로 처리한다
  try {
    const data = fs.readFileSync("/file1.txt");
  } catch (error) {
    res.sendStatus(404);
  }
});

app.get("/file2", (req, res) => {
  return fsAsync.readFile("/file2.txt");
});

app.get("/file3", async (req, res) => {
  const data = await fsAsync.readFile("/file2.txt");
});

// 버전 5 이하에서는: require('express-async-errors');

// Express 5 부터는 이렇게
app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).json({ message: "Something went wrong" });
});

app.listen(8080);
