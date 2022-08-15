import express from "express";
const app = express();

// 해당 path 의 모든 method 수신 (get, post 등등)
app.all("/api", (req, res, next) => {
  console.log("all");
  next();
});
// 해당 path 를 포함한 모든 path 의 method 수신 (ㅎㄷㅅ, post 등등)
app.use("/sky", (req, res, next) => {
  console.log("use");
  next();
});

app.get(
  "/",
  (req, res, next) => {
    console.log("first");
    if (true) {
      return res.send("hello");
    }
    return res.send("hi");
  },
  (req, res, next) => {
    console.log("first2");
    next();
  }
);

app.get("/", (req, res, next) => {
  console.log("second");
  res.sendStatus(200);
});

// server 내에서 처리가 완료되지 않는 경우 수신 후 처리
app.use((req, res, next) => {
  res.status(404).send("Not available");
});
// server 내에서 error 가 던져진 경우 수신 후 처리
app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).send("sorry");
});
app.listen(8080);
