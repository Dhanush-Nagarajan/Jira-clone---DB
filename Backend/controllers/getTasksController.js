import Task from "../models/taskModel.js";
import Sprint from "../models/sprintModel.js";

export const getTasks = async (req, res) =>{
    const {SprintID} = req.params;
    try {
        const sprint = await Sprint.findById(SprintID);
        if(!sprint){
            return res.status(404).json({error:"Sprint not found!"});
        }
        const tasksInTheSprint = await Task.find({_id:sprint.Tasks});
        if(tasksInTheSprint.length===0 || !tasksInTheSprint){
            return res.status(404).json({error:"No tasks found!"});
        }
        res.status(200).json(tasksInTheSprint);

    } catch (error) {
        console.log("Error in the getTasksController",error.message);
        return res.status(500).json({error:"Internal server error"});
    }
};