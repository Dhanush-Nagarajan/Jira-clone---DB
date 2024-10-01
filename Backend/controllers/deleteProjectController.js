import Project from "../models/projectModels.js";
import Sprint from "../models/sprintModel.js";
import Comment from "../models/commentModel.js";
import Task from "../models/taskModel.js";

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
    const sprints = await Sprint.find({ Project_ID: projectId });

    for (const sprint of sprints) {
      const tasks = await Task.find({ Sprint_ID: sprint._id });

      for (const task of tasks) {
        await Comment.deleteMany({ Task_ID: task._id });
      }
      await Task.deleteMany({ Sprint_ID: sprint._id });
    }
    await Sprint.deleteMany({ Project_ID: projectId });
    await Project.findByIdAndDelete(projectId);

    return res.status(200).json({ msg: "Project deleted successfully" });
  } catch (error) {
    return res.status(500).json({ msg: "Server error", error: error.message });
  }
};
