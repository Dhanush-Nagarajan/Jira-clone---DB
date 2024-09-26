import Comment from "../models/commentModel.js";
import Task from "../models/taskModel.js";

export const getComments = async (req, res)=>{
    const {TaskID} = req.params;
    try {
        const task = await Task.findById(TaskID);
        if(!task){
            return res.status(404).json({error:"Task not found!"});
        }
        const comments = await Comment.find({_id:task.comments});
        if( !comments || comments.length===0 ){
            return res.status(404).json({error:"No comments found"});
        }
        res.status(200).json(comments);
    } catch (error) {
        console.log("Error in getComments Controller:",error.message);
        return res.status(500).json({error:"Internal server error"});
    }
};