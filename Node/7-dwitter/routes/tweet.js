import express from "express";
const router = express.Router();

router.use((req, res, next) => {
  // 에러처리를 어떻게 해야할까..
  next();
});

router.get("/", (req, res) => {
  if (req.query.username) {
    const username = req.query.username;
    console.log(`-->GET /tweets?username=${username}`);
  } else {
    console.log("-->GET /tweets");
  }
  res.sendStatus(200);
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  if (id) {
    console.log(`-->GET /tweets/${id}`);
    res.sendStatus(200);
  } else {
    res.sendStatus(400);
  }
});

router.delete("/:id", (req, res, next) => {
  const id = req.params.id;
  if (id) {
    console.log(`-->DELETE /tweets/${id}`);
    res.sendStatus(204);
  } else {
    res.sendStatus(400);
  }
});

router.post("/", (req, res) => {
  const newTweet = req.body;
  if (newTweet) {
    console.log(`-->POST /tweets ${JSON.stringify(newTweet)}`);
    res.sendStatus(201);
  } else {
    res.sendStatus(400);
  }
});

router.put("/:id", (req, res) => {
  const id = req.params.id;
  if (id) {
    console.log(`-->PUT /tweets/${id}`);
    res.sendStatus(201);
  } else {
    res.sendStatus(400);
  }
});

export default router;
