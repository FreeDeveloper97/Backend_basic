import * as userRepository from "./auth.js";
import { getTweets } from "../db/database.js";
import MongoDB from "mongodb";

export async function getAll() {
  return getTweets() //
    .find()
    .sort({ createdAt: -1 })
    .toArray()
    .then(mapTweets);
}

export async function getAllByUsername(username) {
  return getTweets() //
    .find({ username })
    .sort({ createdAt: -1 })
    .toArray()
    .then(mapTweets);
}

export async function getById(id) {
  return getTweets() //
    .findOne({ _id: new MongoDB.ObjectId(id) })
    .then(mapOptionalTweet);
}

export async function create(text, userId) {
  const { name, username, url } = await userRepository.findById(userId);
  const tweet = {
    text,
    createdAt: new Date(),
    userId,
    name,
    username,
    url,
  };
  return getTweets()
    .insertOne(tweet)
    .then((data) => mapOptionalTweet({ _id: data.insertedId, ...tweet }));
}

export async function update(id, text) {
  return getTweets()
    .findOneAndUpdate(
      { _id: new MongoDB.ObjectId(id) },
      { $set: { text } },
      { returnDocument: "after" }
    )
    .then((result) => result.value)
    .then(mapOptionalTweet);
}

export async function remove(id) {
  return getTweets() //
    .deleteOne({ _id: new MongoDB.ObjectId(id) });
}

function mapOptionalTweet(tweet) {
  return tweet ? { ...tweet, id: tweet._id.toString() } : null;
}

function mapTweets(tweets) {
  return tweets.map(mapOptionalTweet);
}
