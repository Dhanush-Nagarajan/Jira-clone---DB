import Project from "../models/projectModels.js";
import User from "../models/userModels.js";

export const addMember = async (req, res) => {
  try {
    const { projectId,newUserId } = req.params; 

    const user = await User.findById(newUserId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ error: "Project does not exist!" });
    }

    if (project.participants.includes(newUserId)) {
      return res.status(400).json({ error: "User is already a member of this project" });
    }

    project.participants.push(newUserId);

    await project.save();

    res.status(200).json({ message: "User added successfully"});
  } catch (error) {
    console.log("Error in addMember controller:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export default addMember;
