// modelの時はファイル名は大文字で始める
import mongoose from "mongoose";
const { Schema } = mongoose;

const schema = new Schema({
  name: {
    type: String,
    trim: true,
    required: [true, "タスク名を入力してください。"],
    maxlength: [20, "タスク名は20文字以内に入力してください。"],
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

export const TaskSchema = mongoose.model("Task", schema);
