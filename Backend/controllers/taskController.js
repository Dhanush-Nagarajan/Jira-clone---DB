import Task from "../models/taskModel.js";
import User from "../models/userModels.js";
import Project from "../models/projectModels.js";

export const addTask = async (req,res)=>{
    const {ProjectID,UserID} = req.params;  
    const assignedBy = req.user._id;
    const {issue} = req.body;

    try {
        const user = await User.findById(UserID);
        const project = await Project.findById(ProjectID);
        if(!user){
            return res.status(500).json({error:"No user was found"});
        }
        if(!project){
            return res.status(500).json({error:"No project was found"});
        }
        const newtask = new Task({
            Project_ID : ProjectID,
            issue,
            status:"To-Do",
            assignedBy,
            assignedTo : UserID
        });
        await newtask.save();
        res.status(201).json({ message: "Task created successfully", newtask });
    } catch (error) {
        console.log("Error in taskController:",error.message);
        res.status(500).json({error:"Internal server error"});
    }

};