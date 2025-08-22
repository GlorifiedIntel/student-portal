import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongodb";
import User from "@/models/User";
import Announcement, { Class } from "@/models/Announcement";

export async function GET(req) {
  try {
    // ✅ Check API key from headers or query string
    const { searchParams } = new URL(req.url);
    const headerKey = req.headers.get("x-api-key");
    const queryKey = searchParams.get("key");

    if (
      headerKey !== process.env.SEED_API_KEY &&
      queryKey !== process.env.SEED_API_KEY
    ) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();

    // Clear old data
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

    return NextResponse.json({ message: "✅ Database seeded successfully!" });
  } catch (error) {
    console.error("Seeding error:", error);
    return NextResponse.json(
      { error: "Seeding failed", details: error.message },
      { status: 500 }
    );
  }
}