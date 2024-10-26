import mongoose, { Schema, Document } from "mongoose";

interface ITask extends Document {
  text: string;
  user: mongoose.Schema.Types.ObjectId;
}

const taskSchema: Schema<ITask> = new Schema(
  {
    text: { type: String, required: [true, "Please add a text value"] },
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<ITask>("Task", taskSchema);