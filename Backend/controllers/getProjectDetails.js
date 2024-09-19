import Project from "../models/projectModels.js";
import Task from "../models/taskModel.js";

export const getProjectDetails = async (req,res) =>{
    const {ProjectID} = req.params;
    try {
        const project = await Project.findById(ProjectID).select("Project_name Access Key createdBy participants");
        const tasks = await Task.find({Project_ID:ProjectID}).select("Project_ID issue status assignedBy assignedTo");
        if (!project){
            return res.status(500).json({error:"Project not found"});
        }
        if (!tasks){
            return res.status(500).json({error:"No tasks found"});
        }
        res.status(200).json({project,tasks});
    } catch (error) {
        console.log("Error in getProjectDetails controller:",error.message);
        res.status(500).json({error:"internal server error"});
    };
};