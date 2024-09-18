import User from "../models/userModels.js";
import Project from "../models/projectModels.js";

export const getUsersForProject = async (req, res) => {
  try {
    const { ProjectID } = req.params;
    const loggedInUserID = req.user._id;

    const project = await Project.findById(ProjectID).select("participants");
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    const projectParticipants = project.participants; 

    const filteredUsers = await User.find({
      _id: { $nin: [loggedInUserID, ...projectParticipants] },
    }).select("-password");

    res.status(200).json(filteredUsers);
  } catch (error) {
    console.log("Error in getFilteredUsers:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
