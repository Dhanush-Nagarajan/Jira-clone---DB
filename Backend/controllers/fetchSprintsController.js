import Sprint from "../models/sprintModel.js";

export const fetchSprints = async (req,res)=>{
    const {ProjectID} = req.params;
    try {
        const sprints = await Sprint.find({Project_ID: ProjectID});
        if(sprints.length===0){
            return res.status(400).json({error:"No active Sprints found."});
        }
        res.status(200).json(sprints);
    } catch (error) {
        console.log("Error in fetchSprints controller:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};