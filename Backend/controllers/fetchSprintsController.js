import Sprint from "../models/sprintModel.js";
import Task from "../models/taskModel.js";

export const fetchSprints = async (req, res) => {
  const { ProjectID } = req.params;

  try {
    const sprints = await Sprint.find({ Project_ID: ProjectID });

    if (sprints.length === 0) {
      return res.status(400).json({ error: "No active Sprints found." });
    }

    const sprintsWithTasks = [];

    for (const sprint of sprints) {
      const tasks = await Task.find({ _id: { $in: sprint.Tasks } });

      if (tasks.length === 0) {
        sprintsWithTasks.push({
          sprint,
          message: "No tasks found for this sprint.",
        });
      } else {
        sprintsWithTasks.push({
          sprint,
          tasks,
        });
      }
    }

    res.status(200).json(sprintsWithTasks);
    
  } catch (error) {
    console.log("Error in fetchSprints controller:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};