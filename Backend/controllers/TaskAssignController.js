import Task from "../models/taskModel.js";

export const TaskAssigner = async (req,res)=> {
    const {TaskID, UserID} = req.params;
    try {
        const task = await Task.findById(TaskID);
        if(!task){
            return res.status(404).json({error:"Task not found!"});
        }
        task.assignedTo = UserID;
        await task.save();
        res.status(200).json({ message: "User assigned to task successfully", task });
    } catch (error) {
        console.error("Error in TaskAssigner controller:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

export default TaskAssigner;