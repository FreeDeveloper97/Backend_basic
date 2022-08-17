import express from "express";
import "express-async-errors";

const router = express.Router();
let tweets = [
  {
    id: "1",
    text: "드림코더분들 화이팅!",
    createdAt: Date.now().toString(),
    name: "Bob",
    username: "bob",
    url: "https://widgetwhats.com/app/uploads/2019/11/free-profile-photo-whatsapp-1.png",
  },
  {
    id: "2",
    text: "안뇽!",
    createdAt: Date.now().toString(),
    name: "Ellie",
    username: "ellie",
  },
];

// GET /tweets
// GET /tweets?username=:username
router.get("/", (req, res) => {
  const username = req.query.username;
  const data = username
    ? tweets.filter((t) => t.username === username)
    : tweets;

  res.status(200).json(data);
});

// GET /tweets/:id
router.get("/:id", (req, res) => {
  const id = req.params.id;
  const tweet = tweets.find((t) => t.id === id);
  if (tweet) {
    res.status(200).json(tweet);
  } else {
    res.status(404).json({ message: `Tweet id(${id})) not found` });
  }
});

// POST /tweets
router.post("/", (req, res) => {
  const data = req.body;
  const tweet = {
    id: Date.now().toString(),
    text: data.text,
    createdAt: new Date(),
    name: data.name,
    username: data.username,
  };
  tweets = [tweet, ...tweets];
  res.status(201).json(tweet);
});

// DELETE /tweets/:id
router.delete("/:id", (req, res, next) => {
  const id = req.params.id;
  tweets = tweets.filter((t) => t.id !== id);
  res.sendStatus(204);
});

// PUT /tweets/:id
router.put("/:id", (req, res) => {
  const id = req.params.id;
  const newText = req.body.text;
  const tweet = tweets.find((t) => t.id === id);
  if (tweet) {
    tweet.text = newText;
    res.status(200).json(tweet);
  } else {
    res.status(404).json({ message: `Tweet id(${id})) not found` });
  }
});

export default router;
