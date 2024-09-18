import Project from "../models/projectModels.js";
import User from "../models/userModels.js";

export const deleteProject = async (req, res) => {
  try {
    
    const userid = req.user._id;

    
    const { projectId } = req.params;

    const project = await Project.findById(projectId);
    
    if (!project) {
      return res.status(404).json({ msg: "Project not found" });
    }

    
    const createrid = project.createdBy.toString(); 

    
    if (createrid !== userid.toString()) {
      return res.status(403).json({ msg: "You are not authorized to delete this project" });
    }

    
    await Project.findByIdAndDelete(projectId);


    return res.status(200).json({ msg: "Project deleted successfully" });

  } catch (error) {
    return res.status(500).json({ msg: "Server error", error: error.message });
  }
};
