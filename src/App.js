import React, { useEffect, useState } from "react";

import "./styles.css";

import api from './services/api';

function App() {
  const [repositories, setRepositories] = useState([]);

  async function handleAddRepository() {
    api.post('repositories', {
      title: "Mobile com ReactJS",
      techs: ["React", "Native"]
    }).then(({ data }) => setRepositories([...repositories, data]));
  }

  async function handleRemoveRepository(id) {
    api.delete(`repositories/${id}`).then(() => {
      const repos = repositories.filter(repository => repository.id !== id);
      setRepositories(repos);
    })
  }

  useEffect(() => {
    api.get('repositories').then(({ data }) => setRepositories(data));
  }, [])

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li key={repository.id}>
            {repository.title}

            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
