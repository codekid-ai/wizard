import axios from 'axios';

const api = axios.create({
  baseURL: '/api'
});

export const createProject = async (projectData) => {
  try {
    const response = await api.post('/projects', projectData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to create project');
  }
};

export const getTemplates = async () => {
  try {
    const response = await api.get('/projects/templates');
    return response.data.templates;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch templates');
  }
};
