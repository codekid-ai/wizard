import { useState } from 'react';
import {
  Container,
  Stepper,
  Step,
  StepLabel,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Box,
  CircularProgress,
  Alert
} from '@mui/material';
import { createProject } from '../services/api';

const steps = ['Project Details', 'Confirmation', 'Creation Status'];

function ProjectWizard() {
  const [activeStep, setActiveStep] = useState(0);
  const [projectData, setProjectData] = useState({
    name: '',
    description: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProjectData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNext = async () => {
    if (activeStep === 1) {
      setLoading(true);
      setError(null);
      try {
        const response = await createProject(projectData);
        setResult(response.data);
        setActiveStep(prev => prev + 1);
      } catch (err) {
        setError(err.message || 'Failed to create project');
      } finally {
        setLoading(false);
      }
    } else {
      setActiveStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    setActiveStep(prev => prev - 1);
    setError(null);
  };

  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        return (
          <>
            <Typography variant="h6" gutterBottom>
              Enter Project Details
            </Typography>
            <TextField
              fullWidth
              label="Project Name"
              name="name"
              value={projectData.name}
              onChange={handleInputChange}
              margin="normal"
              helperText="This will be used for the GitHub repository and Firebase hosting"
            />
            <TextField
              fullWidth
              label="Description"
              name="description"
              value={projectData.description}
              onChange={handleInputChange}
              margin="normal"
              multiline
              rows={3}
            />
          </>
        );

      case 1:
        return (
          <>
            <Typography variant="h6" gutterBottom>
              Confirm Project Details
            </Typography>
            <Typography>
              Project Name: {projectData.name}
            </Typography>
            <Typography>
              Description: {projectData.description}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
              This will:
              - Create a GitHub repository at codekid-ai/{projectData.name}
              - Set up Firebase hosting at codekid-{projectData.name}.web.app
              - Configure automatic deployment with GitHub Actions
            </Typography>
          </>
        );

      case 2:
        return (
          <>
            <Typography variant="h6" gutterBottom>
              Project Creation Status
            </Typography>
            {result && (
              <Box>
                <Alert severity="success" sx={{ mb: 2 }}>
                  Project successfully created!
                </Alert>
                <Typography>
                  Repository URL: <a href={result.repositoryUrl} target="_blank" rel="noopener noreferrer">{result.repositoryUrl}</a>
                </Typography>
                <Typography>
                  Hosting URL: <a href={result.hostingUrl} target="_blank" rel="noopener noreferrer">{result.hostingUrl}</a>
                </Typography>
              </Box>
            )}
          </>
        );
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        CodeKid Project Wizard
      </Typography>
      <Typography variant="subtitle1" align="center" color="text.secondary" gutterBottom>
        Create a new web application with GitHub repository and Firebase hosting
      </Typography>

      <Stepper activeStep={activeStep} sx={{ my: 4 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Card>
        <CardContent>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          {loading ? (
            <Box display="flex" justifyContent="center" p={3}>
              <CircularProgress />
            </Box>
          ) : (
            renderStepContent()
          )}

          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}>
            <Button
              onClick={handleBack}
              disabled={activeStep === 0 || loading}
            >
              Back
            </Button>
            <Button
              variant="contained"
              onClick={handleNext}
              disabled={
                loading ||
                (activeStep === 0 && (!projectData.name || !projectData.description)) ||
                activeStep === 2
              }
            >
              {activeStep === 1 ? 'Create Project' : 'Next'}
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}

export default ProjectWizard;
