const express = require("express");
const Project = require("../models/ProjectsModal");

const router = express.Router();

// POST endpoint to add a new project
router.post("/", async (req, res) => {
  try {
    const { title } = req.body;
    const project = new Project({ title });
    await project.save();
    res.status(201).json(project);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET endpoint to get all projects
router.get("/", async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT endpoint to update a specific project by ID
router.put("/:id", getProject, async (req, res) => {
  try {
    const { title } = req.body;
    if (title != null) {
      res.project.title = title;
    }
    await res.project.save();
    res.json(res.project);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE endpoint to delete a specific project by ID
router.delete("/:id", getProject, async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: "Project deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/toggleHide/:id", getProject, async (req, res) => {
  try {
    const project = res.project;
    project.isHidden = !project.isHidden; // Toggle the value of isHidden
    await project.save();
    res.json(project);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getProject(req, res, next) {
  let project;
  try {
    project = await Project.findById(req.params.id);
    if (project == null) {
      return res.status(404).json({ message: "Project not found" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.project = project;
  next();
}

module.exports = router;
