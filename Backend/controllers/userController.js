import User from "../models/userModels.js";

export const getUsersForProject = async (req,res)=>{
    try{
        const loggedInUserID = req.user._id;

        const filteredUsers = await User.find({_id:{$ne:loggedInUserID}}).select("-password");

        res.status(200).json(filteredUsers);
    }
    catch(error){
        console.log("Error in getUser controller:",error.message);
        res.status(500).json({error:"Internal server error"});
    };
};