import Task from "../models/taskModel.js";

export const addTask = async (req,res)=>{
    const {ProjectID,UserID} = req.params;  
    const assignedBy = req.user._id;
    const {issue,status} = req.body;

    try {
        const newtask = new Task({
            Project_ID : ProjectID,
            issue,
            status,
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