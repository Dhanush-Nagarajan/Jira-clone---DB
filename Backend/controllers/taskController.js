import Task from "../models/taskModel.js";
import Project from "../models/projectModels.js";
import Sprint from "../models/sprintModel.js";

export const addTask = async (req,res)=>{
    const {ProjectID,SprintID} = req.params;  
    const assignedBy = req.user._id;
    const {issue} = req.body;

    try {
        const project = await Project.findById(ProjectID);
        const sprint = await Sprint.findById(SprintID);
        if(!project){
            return res.status(500).json({error:"No project was found"});
        }
        const newtask = new Task({
            Project_ID : ProjectID,
            Sprint_ID : SprintID,
            issue,
            status:"To-Do",
            assignedBy,
            assignedTo : null
        });
        await newtask.save();
        if (!Array.isArray(sprint.Tasks)) {
            sprint.Tasks = [];
        }
        sprint.Tasks.push(newtask);
        await sprint.save();
        res.status(201).json({ message: "Task created successfully", newtask });
    } catch (error) {
        console.log("Error in taskController:",error.message);
        res.status(500).json({error:"Internal server error"});
    }

};