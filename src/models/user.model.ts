import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  level: {
    type: String,
    default: "Lv1"
  },
  tier: {
    name: {
      type: String,
      default: "Enchanter"
    },
    level: {
      type: Number,
      default: 0
    }
  },
  xp: {
    type: Number,
    default: 0
  },
  referral: {
    code: {
      type: String,
      required: true
    },
    users: {
      type: Number,
      default: 0
    },
    xp: {
      type: Number,
      default: 0
    }
  },
  questsCompleted: {
    type: Number,
    default: 0
  },
  tTrustEarned: {
    type: Number,
    default: 0
  },
  dateJoined: {
    type: String,
    required: true
  }
}, { timestamps: true });

export const user = mongoose.model("users", userSchema);