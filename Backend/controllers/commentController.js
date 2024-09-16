import Comment from "../models/commentModel.js";
import User from "../models/userModels.js";

export const addcomment = async(req,res)=>{

  const {comment}= req.body;
  console.log(comment);

  try {
    const createdBy = req.user._id;

    const user = await User.findById(createdBy);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    
    const username = req.user.fullName;

    const newComment = new Comment({  

      createdBy,

      comment,

    }) 
    await newComment.save();
    res.status(201).json({newComment,username});

  } catch (error) {
    console.log("Error in Comment Creation:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
}