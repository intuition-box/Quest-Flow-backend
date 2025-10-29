import mongoose, { Schema } from "mongoose";

const campaignSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  logo: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  startDate: {
    type: String,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  participants: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    default: "Active",
    enum: ["Active", "Scheduled", "Ended"]
  },
  reward: {
    type: String,
    required: true
  },
  projectCoverImage: {
    type: String,
    required: true
  },
}, { timestamps: true });

export const campaign = mongoose.model("campaigns", campaignSchema);