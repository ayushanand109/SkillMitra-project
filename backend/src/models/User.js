import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    bio: {
      type: String,
      default: ""
    },
    skillsToTeach: {
      type: [String],
      default: []
    },
    skillsToLearn: {
      type: [String],
      default: []
    },
    points: {
      type: Number,
      default: 0
    },
    rating: {
      type: Number,
      default: 0
    },
    streak: {
      type: Number,
      default: 0
    },
    
    level: { 
        type: Number, 
        default: 1 
    },
    badges: { 
        type: [String], 
        default: [] 
      },
      jobTitle: {
        type: String,
        default: ""
},
  },
    
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);