import React, { useState } from 'react';
import "./TrainingCatalog.css";
const TrainingCatalog = () => {
  const [searchCriteria, setSearchCriteria] = useState({
    offer: '',
    domain: '',
    theme: '',
    eLearning: false,
  });

  const [results, setResults] = useState([
    { name: 'STAGTST', id: 'STAGTST', duration: 2.0, unit: 'Jour', eLearning: false },
    { name: 'ANGLAIS GENERAL ELEMENTARY 2', id: 'ACTION152', duration: 7.0, unit: 'Jour', eLearning: true },
  ]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSearchCriteria({
      ...searchCriteria,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSearch = () => {
    // Logic to filter results based on search criteria
    console.log('Searching with criteria:', searchCriteria);
  };

  return (
    <div className="container">
      <h1>Catalogue de formation</h1>
      <div>
        <h2>Critères de recherche</h2>
        <div>
          <label>Offre de formation</label>
          <select name="offer" onChange={handleInputChange}>
            <option value="">Langue</option>
            {/* Add more options as needed */}
          </select>
        </div>
        <div>
          <label>Domaine</label>
          <select name="domain" onChange={handleInputChange}>
            <option value="">Domaine</option>
            {/* Add more options as needed */}
          </select>
        </div>
        <div>
          <label>Thème</label>
          <select name="theme" onChange={handleInputChange}>
            <option value="">Thème</option>
            {/* Add more options as needed */}
          </select>
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              name="eLearning"
              checked={searchCriteria.eLearning}
              onChange={handleInputChange}
            />
            e-Learning
          </label>
        </div>
        <button onClick={handleSearch}>SEARCH</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Nom du stage</th>
            <th>ID de cours</th>
            <th>Durée</th>
            <th>Unité</th>
            <th>e-Learning</th>
          </tr>
        </thead>
        <tbody>
          {results.map((result, index) => (
            <tr key={index}>
              <td>{result.name}</td>
              <td>{result.id}</td>
              <td>{result.duration}</td>
              <td>{result.unit}</td>
              <td>
                <input type="checkbox" checked={result.eLearning} readOnly />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TrainingCatalog;