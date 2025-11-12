import mongoose, { Schema } from "mongoose";

const referrerSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  referrerCode: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
}, {timestamps: true});

export const referrer = mongoose.model("referrers", referrerSchema);