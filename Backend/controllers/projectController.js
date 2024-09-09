import Project from "../models/projectModels.js";

export const createProject = async (req, res) => {
  try {
    const { template, Project_type, Project_name, Access, Key } = req.body;

    const existingProject = await Project.findOne({ Project_type, Key });
    if (existingProject) {
      return res.status(400).json({ error: "Project with this type or key already exists" });
    }

    const newProject = new Project({
      template,
      Project_type,
      Project_name,
      Access,
      Key,
    });

    await newProject.save();

    res.status(201).json(newProject);
  } catch (error) {
    console.log("Error in createProject controller:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
