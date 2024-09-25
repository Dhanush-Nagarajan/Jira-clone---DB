import Sprint from "../models/sprintModel.js";
import Project from "../models/projectModels.js";

export const CreateSprint = async (req,res)=>{
    const {ProjectID} = req.params;
    try {
        const project = await Project.findById(ProjectID);
        if(!project){
            return res.status(400).json({error:"Project does not exist!"})
        }
        const newSprint = new Sprint({
            Project_ID:ProjectID ,
            Tasks: null
        });
        await newSprint.save();
        project.Sprint.push(newSprint);
        await project.save();
        res.status(200).json({Sprint : newSprint});
    } catch (error) {
        console.log("Error in SprintController:", error.message);
        return res.status(500).json({error:"Internal server error"});
    };
};