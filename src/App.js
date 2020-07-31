import React, { useState, useEffect } from "react";

import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories ] = useState([]);
  
  useEffect(() => {
    api.get('/repositories').then(response => {
      setRepositories(response.data)
    });
  }, []);

  async function handleAddRepository() {
    // TODO
    const response = await api.post('repositories', {
      url: "https://github.com/natanhermes/desafio-conceitos-nodejs",
      title: "Desafio NodeJS",
      techs: "NodeJS"
    });

    const repository = response.data;

    setRepositories([...repositories, repository])
  }

  async function handleRemoveRepository(id) {
    // TODO
    api.delete(`repositories/${id}`);

    setRepositories(repositories.filter((repo) => repo.id !== id));
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => 
        <li key={repository.url}>
          {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
        </li>)}

      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
