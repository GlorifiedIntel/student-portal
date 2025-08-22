import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../models/User.js";
import Announcement, { Class } from "../models/Announcement.js";

dotenv.config();

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI);

  console.log("Connected to MongoDB, clearing old data...");
  await User.deleteMany({});
  await Class.deleteMany({});
  await Announcement.deleteMany({});

  // Create Users
  const teacher = await User.create({
    clerkId: "teacher_001",
    name: "Mr. John Teacher",
    email: "teacher@example.com",
    role: "teacher",
  });

  const parent = await User.create({
    clerkId: "parent_001",
    name: "Mrs. Mary Parent",
    email: "parent@example.com",
    role: "parent",
  });

  const student1 = await User.create({
    clerkId: "student_001",
    name: "Alice Student",
    email: "alice@example.com",
    role: "student",
    parentId: parent._id,
  });

  const student2 = await User.create({
    clerkId: "student_002",
    name: "Bob Student",
    email: "bob@example.com",
    role: "student",
    parentId: parent._id,
  });

  // Create Class
  const mathClass = await Class.create({
    name: "Math 101",
    teacherId: teacher._id,
    students: [student1._id, student2._id],
    parentId: parent._id,
  });

  // Create Announcements
  await Announcement.create([
    {
      title: "Exam Next Week",
      description: "The math exam will be held on Monday.",
      classId: mathClass._id,
    },
    {
      title: "Holiday Notice",
      description: "School will be closed next Friday.",
      classId: null, // global announcement
    },
    {
      title: "Homework Due",
      description: "Submit your assignments by tomorrow.",
      classId: mathClass._id,
    },
  ]);

  console.log("✅ Database seeded successfully!");
  process.exit();
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});