import React, { useState, useEffect } from 'react';
import "./TrainingCatalog.css";
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const TrainingCatalog = () => {
  const [searchCriteria, setSearchCriteria] = useState({
    title: '',
    category: '',
    trainer: '',
    maxDuration: '',
    maxPrice: '',
  });

  const [courses, setCourses] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    fetch('http://localhost:8000/api/catalogue/', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access")}`
      }
    })
      .then(response => response.json())
      .then(data => {
        // Mise à jour du mapping des données
const formattedData = data.map(course => ({
  id: course.id,
  name: course.title,
  category: course.category,
  duration: course.duration,
  trainer: course.trainer, // ✅
  price: course.price ? parseFloat(course.price).toFixed(2) : '0.00', // ✅
  unit: "heures",
  registered: course.num_inscrits // ✅
}));
        setCourses(formattedData);
        setFilteredResults(formattedData);
        setLoading(false);
      })
      .catch(error => {
        console.error('Erreur lors du chargement du catalogue :', error);
        setLoading(false);
      });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchCriteria((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSearch = () => {
    const filtered = courses.filter((course) => {
      return (
        (searchCriteria.title === '' || course.name.toLowerCase().includes(searchCriteria.title.toLowerCase())) &&
        (searchCriteria.category === '' || course.category === searchCriteria.category) &&
        (searchCriteria.trainer === '' || course.trainer.toLowerCase().includes(searchCriteria.trainer.toLowerCase())) &&
        (searchCriteria.maxDuration === '' || course.duration <= parseInt(searchCriteria.maxDuration)) &&
        (searchCriteria.maxPrice === '' || parseFloat(course.price) <= parseFloat(searchCriteria.maxPrice))
      );
    });
    setFilteredResults(filtered);
  };

  const handleRegister = (courseId) => {
    fetch(`http://localhost:8000/api/inscriptions/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem("access")}`
      },
      body: JSON.stringify({ formation_id: courseId }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Échec de l'inscription");
        return res.json();
      })
      .then(() => {
        setSuccessMessage("Inscription réussie !");
        setTimeout(() => setSuccessMessage(""), 3000);
      })
      .catch((err) => {
        console.error("Erreur d'inscription :", err);
        alert("Échec de l'inscription.");
      });
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

      {successMessage && <div className="success-message">{successMessage}</div>}

      <div className="search-section">
        <h2>Critères de recherche</h2>

        <div>
          <label>Nom de la formation</label>
          <input
            type="text"
            name="title"
            value={searchCriteria.title}
            onChange={handleInputChange}
            placeholder="Ex: Python, Leadership"
          />
        </div>

        <div>
          <label>Catégorie</label>
          <select name="category" value={searchCriteria.category} onChange={handleInputChange}>
            <option value="">Toutes</option>
            <option value="informatique">Informatique</option>
            <option value="management">Management</option>
            <option value="marketing">Marketing</option>
          </select>
        </div>

        <div>
          <label>Formateur</label>
          <input
            type="text"
            name="trainer"
            value={searchCriteria.trainer}
            onChange={handleInputChange}
            placeholder="Nom du formateur"
          />
        </div>

        <div>
          <label>Durée maximale (heures)</label>
          <input
            type="number"
            name="maxDuration"
            value={searchCriteria.maxDuration}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label>Prix maximum (€)</label>
          <input
            type="number"
            name="maxPrice"
            value={searchCriteria.maxPrice}
            onChange={handleInputChange}
          />
        </div>

        <button onClick={handleSearch}>RECHERCHER</button>
      </div>

      <table className="training-table">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Catégorie</th>
            <th>Durée</th>
            <th>Formateur</th>
            <th>Prix (€)</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredResults.length > 0 ? (
            filteredResults.map((course, index) => (
              <tr key={index}>
                <td>{course.name}</td>
                <td>{course.category}</td>
                <td>{course.duration} {course.unit}</td>
                <td>{course.trainer}</td>
                <td>{course.price}</td>
                <td>
                  <button onClick={() => handleRegister(course.id)}>S'inscrire</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" style={{ textAlign: 'center', color: 'gray' }}>
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
