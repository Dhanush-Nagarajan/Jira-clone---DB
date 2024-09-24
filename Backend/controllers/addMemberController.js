import Project from "../models/projectModels.js";
import User from "../models/userModels.js";

export const addMember = async (req, res) => {
  try {
    const { projectId, newUserIds } = req.params;  // projectId and newUserIds are from the URL
    
    // Split newUserIds if it's sent as a comma-separated string
    const userIdsArray = newUserIds.split(',');

    if (userIdsArray.length === 0) {
      return res.status(400).json({ error: "No user IDs provided" });
    }

    // Verify if all user IDs in the userIdsArray exist
    const users = await User.find({ _id: { $in: userIdsArray } });
    if (users.length !== userIdsArray.length) {
      return res.status(404).json({ error: "Some users not found" });
    }

    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ error: "Project does not exist!" });
    }

    // Filter out users who are already participants
    const nonParticipants = userIdsArray.filter(userId => !project.participants.includes(userId));

    // If all users are already participants, return an appropriate response
    if (nonParticipants.length === 0) {
      return res.status(400).json({ error: "All users are already members of this project" });
    }

    // Add non-participants to the project's participants array
    project.participants.push(...nonParticipants);

    await project.save();

    res.status(200).json({ message: "Users added successfully", addedUsers: nonParticipants });
  } catch (error) {
    console.log("Error in addMembers controller:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export default addMember;
