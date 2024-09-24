import Task from "../models/taskModel";
import User from "../models/userModels";

export const TaskAssigner = async (req,res)=> {
    const {TaskID, UserID} = req.params;
    try {
        const task = await Task.findById(TaskID)
    } catch (error) {
        
    }
};

export default TaskAssigner;