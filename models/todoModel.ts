import { Document, Schema, model } from "mongoose";

export interface ITodo extends Document {
  _id: {
    id: string;
  };
  value: string;
  userId: string;
  createTime: Date;
  status: "pending" | "completed";
  modifyTime: Date;
}

const todoSchema = new Schema<ITodo>({
  value: {
    type: String,
    required: true,
  },
  userId: {
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

export const todoModel = model<ITodo>("Todo", todoSchema);
