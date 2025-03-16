import fs from 'fs/promises';
import path from 'path';
import { githubService } from './github.js';
import { firebaseService } from './firebase.js';
import { logger } from '../config/logger.js';

class ProjectService {
  constructor() {
    this.templatesPath = path.join(process.cwd(), 'src', 'templates');
  }

  async createProject(projectData) {
    const { name, description, template = 'basic-webapp' } = projectData;

    try {
      logger.info(`Starting project creation: ${name}`);

      // 1. Create GitHub repository
      const repo = await githubService.createRepository(name, description);
      logger.info(`Created GitHub repository: ${repo.html_url}`);

      // 2. Create Firebase hosting site
      const siteName = `codekid-${name}`;
      await firebaseService.createHostingSite(siteName);
      logger.info(`Created Firebase hosting site: ${siteName}`);

      // 3. Generate Firebase configuration
      const firebaseConfig = await firebaseService.generateFirebaseConfig(siteName);
      
      // 4. Setup GitHub Actions for deployment
      await githubService.setupGithubActions(name);
      logger.info(`Setup GitHub Actions workflow for ${name}`);

      // 5. Return project details
      return {
        status: 'success',
        data: {
          name,
          repositoryUrl: repo.html_url,
          hostingUrl: `https://${siteName}.web.app`,
          firebaseConfig
        }
      };
    } catch (error) {
      logger.error(`Error creating project: ${error.message}`);
      throw error;
    }
  }

  async getTemplates() {
    try {
      const templates = await fs.readdir(this.templatesPath);
      return templates.filter(t => !t.startsWith('.'));
    } catch (error) {
      logger.error(`Error reading templates: ${error.message}`);
      throw error;
    }
  }
}

export const projectService = new ProjectService();
