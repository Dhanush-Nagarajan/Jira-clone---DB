import Project from "../models/projectModels.js";

export const createProject = async (req, res) => {
  try {
    const {Project_type, Project_name, Access, Key } = req.body;
    const createdBy = req.user._id;

    const existingProject = await Project.findOne({ Project_type, Key });
    if (existingProject) {
      return res.status(400).json({ error: "Project with this type or key already exists" });
    }

    const newProject = new Project({
      Project_type,
      Project_name,
      Access,
      Key,
      createdBy,
    });

    await newProject.save();

    res.status(201).json(newProject);
  } catch (error) {
    console.log("Error in createProject controller:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export default createProject;