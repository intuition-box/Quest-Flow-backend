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
  totalXpAvailable: {
    type: Number,
    required: true
  },
  xpClaimed: {
    type: Number,
    default: 0
  },
  totalTtrustAvailable: {
    type: Number,
    required: true
  },
  tTrustClaimed: {
    type: Number,
    default: 0
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
    xp: {
      type: Number,
      required: true
    },
    tokenPerUser: {
      type: Number,
      required: true
    },
  },
  noOfTasks: {
    type: Number,
    default: 0
  },
  projectCoverImage: {
    type: String,
    required: true
  },
  creator: {
    types: mongoose.Schema.Types.ObjectId,
    ref: "user"
  }
}, { timestamps: true });

export const campaign = mongoose.model("campaigns", campaignSchema);


const campaignCompletedSchema = new Schema({
  tasksCompleted: {
    type: Boolean,
    default: false
  },
  campaignCompleted: {
    type: Boolean,
    default: false
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  },
  campaign: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "campaign"
  }
}, { timestamps: true });

export const campaignCompleted = mongoose.model("completed-campaigns", campaignCompletedSchema);

