import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  Task_ID: {
    type: mongoose.Schema.Types.ObjectId,
		ref: 'Task',
		required: true,
  },
  createdBy:{
    type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true,
  },
  comment:{
    type: String,
    required: true,
  }
})
const Comment= mongoose.model("Comment",commentSchema)

export default Comment;