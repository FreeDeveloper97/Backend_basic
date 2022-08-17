import express from "express";
import "express-async-errors";
import * as tweetRepository from "../data/tweet.js";

const router = express.Router();

// GET /tweets
// GET /tweets?username=:username
router.get("/", (req, res) => {
  const username = req.query.username;
  const data = username
    ? tweetRepository.getAllByUsername(username)
    : tweetRepository.getAll();

  res.status(200).json(data);
});

// GET /tweets/:id
router.get("/:id", (req, res) => {
  const id = req.params.id;
  const tweet = tweetRepository.getById(id);
  if (tweet) {
    res.status(200).json(tweet);
  } else {
    res.status(404).json({ message: `Tweet id(${id})) not found` });
  }
});

// POST /tweets
router.post("/", (req, res) => {
  const { text, name, username } = req.body;
  const tweet = tweetRepository.create(text, name, username);
  if (tweet) {
    res.status(201).json(tweet);
  } else {
    res.status(400).json({ message: "Tweet can't create" });
  }
});

// DELETE /tweets/:id
router.delete("/:id", (req, res, next) => {
  const id = req.params.id;
  tweetRepository.remove(id);
  res.sendStatus(204);
});

// PUT /tweets/:id
router.put("/:id", (req, res) => {
  const id = req.params.id;
  const text = req.body.text;
  const tweet = tweetRepository.update(id, text);
  if (tweet) {
    res.status(200).json(tweet);
  } else {
    res.status(404).json({ message: `Tweet id(${id})) not found` });
  }
});

export default router;
