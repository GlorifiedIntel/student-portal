import mongoose from "mongoose";

const StudentSchema = new mongoose.Schema({
  name: String,
  sex: { type: String, enum: ["MALE", "FEMALE"] },
});

export default mongoose.models.Student || mongoose.model("Student", StudentSchema);