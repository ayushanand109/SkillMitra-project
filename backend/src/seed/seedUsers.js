import mongoose from "mongoose";
import dotenv from "dotenv";
import { User } from "../models/User.js";
import bcrypt from "bcryptjs";

dotenv.config();

const users = [
  {
    name: "Rahul Sharma",
    email: "rahul@test.com",
    password: "123456",
    jobTitle: "Frontend Developer",
    bio: "I love teaching React and learning DevOps",
    skillsToTeach: ["React", "JavaScript"],
    skillsToLearn: ["Docker", "Kubernetes"],
    points: 1200,
    level: 4
  },
  
  
  {
    name: "Arjun Mehta",
    email: "arjun@test.com",
    password: "123456",
    jobTitle: "DevOps Engineer",
    bio: "I enjoy automating infrastructure",
    skillsToTeach: ["Docker", "Kubernetes"],
    skillsToLearn: ["React"],
    points: 1500,
    level: 5
  },

  {
  name: "Priya Patel",
  email: "priya@test.com",
  password: "123456",
  jobTitle: "Python Developer",
  bio: "I love working with Python and AI models.",
  skillsToTeach: ["Python", "Machine Learning"],
  skillsToLearn: ["Java", "Spring Boot"],
  points: 900,
  level: 3
},

{
  name: "Karan Verma",
  email: "karan@test.com",
  password: "123456",
  jobTitle: "Backend Developer",
  bio: "Building scalable backend APIs.",
  skillsToTeach: ["Java", "Spring Boot"],
  skillsToLearn: ["Machine Learning"],
  points: 1000,
  level: 3
},

  {
    name: "Sneha Gupta",
    email: "sneha@test.com",
    password: "123456",
    jobTitle: "Full Stack Developer",
    bio: "Teaching MERN stack and learning ML",
    skillsToTeach: ["Node.js", "MongoDB"],
    skillsToLearn: ["Machine Learning"],
    points: 800,
    level: 3
  },
  {
  name: "Ananya Singh",
  email: "ananya@test.com",
  password: "123456",
  jobTitle: "UI/UX Designer",
  bio: "Designing beautiful digital experiences.",
  skillsToTeach: ["UI/UX", "Figma"],
  skillsToLearn: ["Node.js"],
  points: 700,
  level: 2
  }

];

const seedUsers = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    await User.deleteMany();

    const hashedUsers = await Promise.all(
      users.map(async (user) => ({
        ...user,
        password: await bcrypt.hash(user.password, 10)
      }))
    );

    await User.insertMany(hashedUsers);

    console.log("Mock users inserted successfully");
    process.exit();

  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedUsers();