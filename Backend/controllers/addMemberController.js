import Team from "../models/teamModel.js";
import User from "../models/userModels.js";

export const addMember = async (req, res) => {
  try {
    const { projectId, newUserId } = req.params; 

    const user = await User.findById(newUserId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const team = await Team.findOne({ Project: projectId });
    if (!team) {
      return res.status(404).json({ error: "Team not found for this project" });
    }

    if (team.participants.includes(newUserId)) {
      return res.status(400).json({ error: "User is already a member of this project" });
    }

    team.participants.push(newUserId);

    await team.save();

    res.status(200).json({ message: "User added successfully", team });
  } catch (error) {
    console.log("Error in addMember controller:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export default addMember;
