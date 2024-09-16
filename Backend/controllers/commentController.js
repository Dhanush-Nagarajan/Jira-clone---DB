// import Team from "../models/teamModel.js";
import Comment from "../models/commentModel.js"
export const comment = async(req,res)=>{
  const {comment}= req.body;
  console.log(comment)
  try {
    const createdBy = req.user._id;
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