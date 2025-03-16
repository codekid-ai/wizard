import { Octokit } from 'octokit';
import { logger } from '../config/logger.js';

class GitHubService {
  constructor() {
    this.octokit = new Octokit({
      auth: process.env.GITHUB_TOKEN
    });
    this.org = process.env.GITHUB_ORG;
  }

  async createRepository(name, description) {
    try {
      const response = await this.octokit.rest.repos.createInOrg({
        org: this.org,
        name,
        description,
        private: false,
        auto_init: true
      });

      logger.info(`Created repository: ${name} in organization: ${this.org}`);
      return response.data;
    } catch (error) {
      logger.error(`Error creating repository: ${error.message}`);
      throw error;
    }
  }

  async setupGithubActions(repoName) {
    try {
      const workflowContent = `
name: Deploy to Firebase
on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        
    - name: Install Dependencies
      run: npm install
      
    - name: Deploy to Firebase
      uses: FirebaseExtended/action-hosting-deploy@v0
      with:
        repoToken: "\${{ secrets.GITHUB_TOKEN }}"
        firebaseServiceAccount: "\${{ secrets.FIREBASE_SERVICE_ACCOUNT }}"
        projectId: ${process.env.FIREBASE_PROJECT_ID}
        channelId: live`;

      await this.octokit.rest.repos.createOrUpdateFileContents({
        owner: this.org,
        repo: repoName,
        path: '.github/workflows/firebase-deploy.yml',
        message: 'Add Firebase deployment workflow',
        content: Buffer.from(workflowContent).toString('base64')
      });

      logger.info(`Setup GitHub Actions for repository: ${repoName}`);
    } catch (error) {
      logger.error(`Error setting up GitHub Actions: ${error.message}`);
      throw error;
    }
  }
}

export const githubService = new GitHubService();
