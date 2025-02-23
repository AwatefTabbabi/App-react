import React, { useState } from 'react';
import "./TrainingCatalog.css";
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react'; // Import de l'icône
const TrainingCatalog = () => {
  const [searchCriteria, setSearchCriteria] = useState({
    offer: '',
    domain: '',
    theme: '',
    eLearning: false,
  });

  const [results] = useState([
    { name: 'STAGTST', id: 'STAGTST', duration: 2.0, unit: 'Jour', eLearning: false },
    { name: 'ANGLAIS GENERAL ELEMENTARY 2', id: 'ACTION152', duration: 7.0, unit: 'Jour', eLearning: true },
  ]);

  const [filteredResults, setFilteredResults] = useState(results);

  // Gestion du changement des inputs
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSearchCriteria((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // Filtrage des résultats
  const handleSearch = () => {
    const filtered = results.filter((course) => {
      return (
        (searchCriteria.offer === '' || course.name.toLowerCase().includes(searchCriteria.offer.toLowerCase())) &&
        (searchCriteria.eLearning === false || course.eLearning === true)
      );
    });
    setFilteredResults(filtered);
  };

  return (
    <div className="training-catalog">
       {/* Icône Retour */}
       <Link to="/" className="back-icon">
        <ArrowLeft size={24} />
      </Link>
      <h1>Catalogue de formation</h1>

      {/* Critères de recherche */}
      <div className="search-section">
        <h2>Critères de recherche</h2>

        <div>
          <label>Offre de formation</label>
          <select name="offer" onChange={handleInputChange}>
            <option value="">Toutes</option>
            <option value="Langue">Langue</option>
          </select>
        </div>

        <div>
          <label>Domaine</label>
          <select name="domain" onChange={handleInputChange}>
            <option value="">Tous</option>
            <option value="Informatique">Informatique</option>
          </select>
        </div>

        <div>
          <label>Thème</label>
          <select name="theme" onChange={handleInputChange}>
            <option value="">Tous</option>
            <option value="Développement">Développement</option>
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

      {/* Tableau des formations */}
      <table className="training-table">
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
          {filteredResults.length > 0 ? (
            filteredResults.map((course, index) => (
              <tr key={index}>
                <td>{course.name}</td>
                <td>{course.id}</td>
                <td>{course.duration}</td>
                <td>{course.unit}</td>
                <td>
                  <input type="checkbox" checked={course.eLearning} readOnly />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" style={{ textAlign: 'center', color: 'gray' }}>
                Aucun résultat trouvé.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TrainingCatalog;
