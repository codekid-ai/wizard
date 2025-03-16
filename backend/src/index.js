import express from 'express';
import cors from 'cors';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.post('/api/projects', async (req, res) => {
  try {
    const { name, description } = req.body;
    
    // For now, just return mock data
    // In a real implementation, this would create GitHub repo and Firebase hosting
    res.json({
      status: 'success',
      data: {
        name,
        repositoryUrl: `https://github.com/codekid-ai/${name}`,
        hostingUrl: `https://codekid-${name}.web.app`
      }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
});

app.listen(port, () => {
  console.log(`Project Wizard service listening on port ${port}`);
});
