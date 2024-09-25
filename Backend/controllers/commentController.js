import Comment from "../models/commentModel.js";
import User from "../models/userModels.js";
import Task from "../models/taskModel.js";

export const addcomment = async(req,res)=>{
  const {TaskID} = req.params;
  const {comment}= req.body;

  try {
    const createdBy = req.user._id;

    const user = await User.findById(createdBy);
    const task = await Task.findById(TaskID);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
    
    const username = req.user.fullName;

    const newComment = new Comment({  
      Task_ID: TaskID,
      createdBy,
      comment,

    });
    await newComment.save();
    task.comments.push(newComment);
    await task.save();
    res.status(201).json({newComment,username});

  } catch (error) {
    console.log("Error in Comment Creation:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
}