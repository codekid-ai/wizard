# CodeKid Project Wizard

A web application that automates the creation of new CodeKid projects, handling GitHub repository setup, Firebase hosting configuration, and deployment workflow automation.

## Features

- Create new web applications with a simple form
- Automatic GitHub repository creation under the codekid-ai organization
- Firebase hosting setup with the existing project (gamer-26b29)
- Automated deployment workflow using GitHub Actions
- Modern, responsive UI built with React and Material-UI

## Project Structure

```
project-wizard/
├── backend/                 # Node.js backend service
│   ├── src/
│   │   ├── config/         # Configuration files
│   │   ├── routes/         # API routes
│   │   ├── services/       # Core services (GitHub, Firebase)
│   │   └── templates/      # Project templates
│   ├── package.json
│   └── .env.example
├── frontend/               # React frontend application
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── services/       # API services
│   │   └── styles/        # Theme and styles
│   ├── package.json
│   └── vite.config.js
└── README.md
```

## Setup Instructions

1. Backend Setup:
   ```bash
   cd backend
   npm install
   cp .env.example .env    # Configure with your tokens
   npm run dev
   ```

2. Frontend Setup:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

3. Environment Variables:
   - GitHub Token with repository creation permissions
   - Firebase service account credentials
   - Firebase project ID (gamer-26b29)

## Usage

1. Visit the web interface at http://localhost:5173
2. Enter your project name and description
3. Review the configuration
4. Click "Create Project" to:
   - Create a GitHub repository
   - Set up Firebase hosting
   - Configure automated deployment

## API Endpoints

- `POST /api/projects`: Create a new project
- `GET /api/projects/templates`: List available project templates

## Development

- Backend runs on port 3000
- Frontend runs on port 5173 with proxy to backend
- Uses ESM modules throughout
- Material-UI for consistent styling
