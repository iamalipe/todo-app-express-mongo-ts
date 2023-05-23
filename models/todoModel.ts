import { Document, Schema, model } from "mongoose";

interface ITodo extends Document {
  value: string;
  email: string;
  createTime: Date;
  status: "pending" | "completed";
  modifyTime: Date;
}

const todoSchema = new Schema<ITodo>({
  value: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  createTime: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ["pending", "completed"],
    default: "pending",
  },
  modifyTime: {
    type: Date,
    default: Date.now,
  },
});

export default model<ITodo>("Todo", todoSchema);
