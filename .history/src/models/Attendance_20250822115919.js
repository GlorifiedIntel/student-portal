import mongoose from "mongoose";

const AttendanceSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  present: {
    type: Boolean,
    required: true,
  },
});

// Prevent model overwrite on hot-reload in dev
export default mongoose.models.Attendance || mongoose.model("Attendance", AttendanceSchema);