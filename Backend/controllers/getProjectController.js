import Project from "../models/projectModels.js";

export const GetProjectForUser = async (req,res) =>{

    try{
        const loggedInUserID = req.user._id;
        const FilterProjects = await Project.find({$or: [{ createdBy: loggedInUserID },{ participants: loggedInUserID }]}).select("Project_name Key createdBy");
        res.status(200).json(FilterProjects);
    }
    catch (error){
        console.log("Error in GetProjectForUser controller:", error.message);
        res.status(500).json({error:"internal server error"});
    }
}