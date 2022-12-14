import Mongoose from "mongoose";
import { config } from "../config.js";

export async function connectDB() {
  return Mongoose.connect(config.db.host);
}

// _id -> id: JSON, Object 반영
export function useVirtualId(schema) {
  schema.virtual("id").get(function () {
    return this._id.toString();
  });
  schema.set("toJSON", { virtual: true });
  schema.set("toObject", { virtual: true });
}

export function getTweets() {
  return db.collection("tweets");
}
