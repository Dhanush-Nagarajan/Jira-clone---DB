import Project from "../models/projectModels.js";
import Team from "../models/teamModel.js";

export const createProject = async (req, res) => {
  try {
    const { projectName, access, key } = req.body;
    const createdBy = req.user._id;

    // Check if a project with the same name already exists
    const existingProject = await Project.findOne({ projectName });
    if (existingProject) {
      return res.status(400).json({ error: "Project with this name already exists" });
    }

    // Create a new project
    const newProject = new Project({
      projectName,
      access,
      key,
      createdBy,
    });

    await newProject.save();

    // Create a new team associated with the project
    const newTeam = new Team({
      project: newProject._id,
      participants: [createdBy],
    });

    await newTeam.save();

    res.status(201).json({ project: newProject, team: newTeam });
  } catch (error) {
    console.error("Error in createProject controller:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export default createProject;
