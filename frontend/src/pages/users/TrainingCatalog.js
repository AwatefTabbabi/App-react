import React, { useState, useEffect } from 'react';
import "./TrainingCatalog.css";
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const TrainingCatalog = () => {
  const [searchCriteria, setSearchCriteria] = useState({
    offer: '',
    domain: '',
    theme: '',
    eLearning: false,
  });

  const [courses, setCourses] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [loading, setLoading] = useState(true);

  // Récupération des données depuis l'API Django
  useEffect(() => {
    fetch('/trainings/')
      .then(response => response.json())
      .then(data => {
        const formattedData = data.map(course => ({
          name: course.name,
          id: course.course_id,
          duration: course.duration,
          unit: course.unit,
          eLearning: course.e_learning,
          domain: course.domain,
          theme: course.theme
        }));
        setCourses(formattedData);
        setFilteredResults(formattedData);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error:', error);
        setLoading(false);
      });
  }, []);

  // Gestion du changement des inputs
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSearchCriteria((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // Filtrage des résultats selon les critères
  const handleSearch = () => {
    const filtered = courses.filter((course) => {
      return (
        (searchCriteria.offer === '' || course.domain === searchCriteria.offer) &&
        (searchCriteria.domain === '' || course.domain === searchCriteria.domain) &&
        (searchCriteria.theme === '' || course.theme === searchCriteria.theme) &&
        (!searchCriteria.eLearning || course.eLearning)
      );
    });
    setFilteredResults(filtered);
  };

  if (loading) {
    return <div className="training-catalog">Chargement en cours...</div>;
  }

  return (
    <div className="training-catalog">
      <Link to="/" className="back-icon">
        <ArrowLeft size={24} />
      </Link>
      <h1>Catalogue de formation</h1>

      <div className="search-section">
        <h2>Critères de recherche</h2>

        <div>
          <label>Offre de formation</label>
          <select name="offer" onChange={handleInputChange}>
            <option value="">Toutes</option>
            <option value="Langue">Langue</option>
            <option value="Informatique">Informatique</option>
          </select>
        </div>

        <div>
          <label>Domaine</label>
          <select name="domain" onChange={handleInputChange}>
            <option value="">Tous</option>
            <option value="Informatique">Informatique</option>
            <option value="Management">Management</option>
          </select>
        </div>

        <div>
          <label>Thème</label>
          <select name="theme" onChange={handleInputChange}>
            <option value="">Tous</option>
            <option value="Développement">Développement</option>
            <option value="Réseaux">Réseaux</option>
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

        <button onClick={handleSearch}>RECHERCHER</button>
      </div>

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