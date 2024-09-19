import User from "../models/userModels.js";
import Project from "../models/projectModels.js";

export const getParticipants = async (req,res) =>{
    const {ProjectID} = req.params;
    const loggedInUserID = req.user._id;

    try {
        const project = await Project.findById(ProjectID).select("participants");

        if(!project){
            return res.status(500).json({error:"Project not found"});
        }

        const Participants_data = await User.find({_id:{$in:project.participants , $ne: loggedInUserID}}).select("-password -createdAt -updatedAt -__v");
        res.status(200).json(Participants_data);

    } catch (error) {
        console.error("Error in getParticipants controller:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}