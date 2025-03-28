import Project from "../models/project.model.js";

export const createProject = async (req, res) => {
  try {
    const project = new Project(req.body);
    await project.save();
    res.status(201).json(project);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find().populate("supervisor team");
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const submitRepo = async (req, res) => {
  try {
    const { repoLink } = req.body;
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      { repoLink, latestSubmission: new Date() },
      { new: true }
    );
    res.json(project);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const evaluateProject = async (req, res) => {
  try {
    const { rating, feedback } = req.body;
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      { evaluation: { rating, feedback, evaluatedAt: new Date() } },
      { new: true }
    );
    res.json(project);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
