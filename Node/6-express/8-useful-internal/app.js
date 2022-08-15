import express from "express";

const app = express();

// express.json -> REST API, body parse
// express.urlencoded -> HTML form
// express.static

app.use(express.json());
app.post("/posts", (req, res) => {
  console.log(req.body);
  res.status(201).send("Thanks, Created");
});

const options = {
  dotfiles: "ignore", // 숨겨진 파일은 표시안되도록
  etag: false,
  index: false,
  maxAge: "1d", // 캐쉬 기간
  redirect: false,
  setHeaders: function (res, path, stat) {
    res.set("x-timestamp", Date.now()); // 헤더에 필요정보 반환
  },
};

app.use(express.static("public", options));
app.listen(8080);
