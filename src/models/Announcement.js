import mongoose from "mongoose";

const AnnouncementSchema = new mongoose.Schema({
  title: String,
  description: String,
  date: { type: Date, default: Date.now },
  classId: { type: mongoose.Schema.Types.ObjectId, ref: "Class" }
});

const ClassSchema = new mongoose.Schema({
  name: { type: String, required: true },
  teacherId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  parentId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
});

export const Class =
  mongoose.models.Class || mongoose.model("Class", ClassSchema);

export default mongoose.models.Announcement ||
  mongoose.model("Announcement", AnnouncementSchema);