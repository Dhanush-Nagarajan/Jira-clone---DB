import Project from "../models/projectModels.js";
import User from "../models/userModels.js";

export const addMember = async (req, res) => {
  try {
    const { projectId } = req.params; 
    const { userIds } = req.body;

    if (!Array.isArray(userIds) || userIds.length === 0) {
      return res.status(400).json({ error: "No user IDs provided" });
    }

    const users = await User.find({ _id: { $in: userIds } });
    if (users.length !== userIds.length) {
      return res.status(404).json({ error: "Some users not found" });
    }

    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ error: "Project does not exist!" });
    }

    const nonParticipants = userIds.filter(userId => !project.participants.includes(userId));

    if (nonParticipants.length === 0) {
      return res.status(400).json({ error: "All users are already members of this project" });
    }

    project.participants.push(...nonParticipants);

    await project.save();

    res.status(200).json({ message: "Users added successfully", addedUsers: nonParticipants });
  } catch (error) {
    console.log("Error in addMembers controller:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export default addMember;
