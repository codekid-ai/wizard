import { useState } from 'react';

function App() {
  const [projectData, setProjectData] = useState({
    name: '',
    description: ''
  });
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(projectData)
      });
      const data = await response.json();
      setStatus(`Project created! Repository: ${data.repositoryUrl}, Hosting: ${data.hostingUrl}`);
    } catch (error) {
      setStatus(`Error: ${error.message}`);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>CodeKid Project Wizard</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Project Name:
            <input
              type="text"
              value={projectData.name}
              onChange={(e) => setProjectData({ ...projectData, name: e.target.value })}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Description:
            <textarea
              value={projectData.description}
              onChange={(e) => setProjectData({ ...projectData, description: e.target.value })}
              required
            />
          </label>
        </div>
        <button type="submit">Create Project</button>
      </form>
      {status && <p>{status}</p>}
    </div>
  );
}

export default App;
