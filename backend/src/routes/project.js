import express from 'express';
import { projectService } from '../services/project.js';
import { logger } from '../config/logger.js';

const router = express.Router();

// Create a new project
router.post('/', async (req, res, next) => {
  try {
    const projectData = req.body;
    const result = await projectService.createProject(projectData);
    res.status(201).json(result);
  } catch (error) {
    logger.error(`Error in project creation: ${error.message}`);
    next(error);
  }
});

// Get available project templates
router.get('/templates', async (req, res, next) => {
  try {
    const templates = await projectService.getTemplates();
    res.json({ templates });
  } catch (error) {
    logger.error(`Error fetching templates: ${error.message}`);
    next(error);
  }
});

export default router;
