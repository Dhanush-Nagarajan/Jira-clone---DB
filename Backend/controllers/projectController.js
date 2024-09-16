import Project from "../models/projectModels.js";
import Team from "../models/teamModel.js";
// import Team from "../models/teamModel.js";
import Comment from "../models/commentModel.js"
export const createProject = async (req, res) => {
  try {
    const { Project_name, Access, Key } = req.body;
    const createdBy = req.user._id;
    // const username = req.user.fullName; 
    // console.log(username)

    const existingProject = await Project.findOne({ Project_name });
    if (existingProject) {
      return res.status(400).json({ error: "Project with this name already exists" });
    }

    const newProject = new Project({
      Project_name,
      Access,
      Key,
      createdBy,
    });
    await newProject.save();
    const newTeam = new Team({
      Project: newProject._id,
      participants: [createdBy],
    });
    await newTeam.save();
    res.status(201).json({ project: newProject, team: newTeam });
  } catch (error) {
    console.log("Error in createProject controller:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }};

  // comment API
  export const comment = async(req,res)=>{
    const {comment}= req.body;
    console.log(comment)
    try {
      const createdBy = req.user._id;
      const username = req.user.fullName;
      const newComment = new Comment({  
        createdBy,
        comment,
      }) 
      await newComment.save();
      res.status(201).json({newComment,username});

    } catch (error) {
      console.log("Error in Comment Creation:", error.message);
      res.status(500).json({ error: "Internal server error" });
    }
  }