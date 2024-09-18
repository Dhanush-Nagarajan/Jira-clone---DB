import Project from "../models/projectModels.js";
export const createProject = async (req, res) => {
  try {
    const { Project_name, Access, Key } = req.body;
    const createdBy = req.user._id;
    

    const existingProject = await Project.findOne({ Project_name });
    if (existingProject) {
      return res.status(400).json({ error: "Project with this name already exists" });
    }

    const newProject = new Project({
      Project_name,
      Access,
      Key,
      createdBy,
      participants: [createdBy]
    });
    await newProject.save();
    res.status(201).json({ project: newProject});
  } catch (error) {
    console.log("Error in createProject controller:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }};