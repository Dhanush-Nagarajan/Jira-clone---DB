import User from "../models/userModels.js"

export const getLead = async (req, res)=>{
    const {userID} = req.params;    
    const lead = await User.findById(userID);
    try {
        if (!lead) {
            return res.status(404).json({ error: "Lead not found" });
        }
        const LeadDetails = await User.findById(userID).select("-password -createdAt -updatedAt");
        res.status(200).json(LeadDetails);
    } catch (error) {
        console.log("Error in getLeadController:",error.message);
        res.status(500).json({ error: "Internal server error" });
    };

};