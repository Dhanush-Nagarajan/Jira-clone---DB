import Project from "../models/projectModels.js";
import User from "../models/userModels.js";

export const deleteProject = async (req, res) => {
  try {
    // Get the user ID from the authenticated user (req.user should be set after authentication)
    const userid = req.user._id;

    // Get the project ID from the request parameters
    const { projectId } = req.params;

    // Find the project by its ID
    const project = await Project.findById(projectId);
    
    // If the project doesn't exist, return a 404 response
    if (!project) {
      return res.status(404).json({ msg: "Project not found" });
    }

    // Get the creator's ID (assuming `createdBy` is the field that stores the project creator)
    const createrid = project.createdBy.toString(); // Convert ObjectId to string

    // Check if the creator's ID matches the current user's ID
    if (createrid !== userid.toString()) {
      return res.status(403).json({ msg: "You are not authorized to delete this project" });
    }

    // If the creator and current user match, delete the project
    await Project.findByIdAndDelete(projectId);

    // Return success response
    return res.status(200).json({ msg: "Project deleted successfully" });

  } catch (error) {
    // Handle any server error
    return res.status(500).json({ msg: "Server error", error: error.message });
  }
};
