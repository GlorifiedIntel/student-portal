import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  clerkId: {
    type: String, // store Clerk's userId here
    required: true,
    unique: true,
  },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: {
    type: String,
    enum: ["admin", "teacher", "student", "parent"],
    required: true,
  },
  parentId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    default: null // if the user is a student, link their parent
  }
});

export default mongoose.models.User || mongoose.model("User", UserSchema);