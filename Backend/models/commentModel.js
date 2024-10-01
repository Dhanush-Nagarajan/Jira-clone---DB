import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  Project_ID:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Project',
    required:true
  },
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