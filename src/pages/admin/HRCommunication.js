import React, { useState, useEffect } from "react";
import { FaSearch, FaSort, FaFileUpload, FaCheckCircle } from "react-icons/fa";
import "./HRCommunication.css";
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";

const schema = yup.object().shape({
  title: yup.string().required("Le titre est obligatoire"),
  content: yup.string().required("Le contenu est obligatoire"),
  date: yup.string().required("La date est obligatoire"),
  file: yup.mixed().nullable(),
});

const HRCommunication = () => {
  const { user } = useAuth();
  const [announcements, setAnnouncements] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "ascending" });
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const { 
    register, 
    handleSubmit, 
    formState: { errors }, 
    reset,
    watch 
  } = useForm({
    resolver: yupResolver(schema),
  });

  const fileWatch = watch("file");

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    try {
      setLoading(true);
      // Remplacez par votre endpoint API réel
      const response = await axios.get("http://localhost:8000/api/announcements/");
      setAnnouncements(response.data);
      setLoading(false);
    } catch (err) {
      setError("Erreur lors du chargement des annonces");
      setLoading(false);
      console.error("Fetch error:", err);
    }
  };

  const requestSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const sortedAnnouncements = React.useMemo(() => {
    const sortableItems = [...announcements];
    if (sortConfig.key) {
      sortableItems.sort((a, b) => {
        // Convertir en minuscules pour le tri insensible à la casse
        const aValue = typeof a[sortConfig.key] === 'string' 
          ? a[sortConfig.key].toLowerCase() 
          : a[sortConfig.key];
          
        const bValue = typeof b[sortConfig.key] === 'string' 
          ? b[sortConfig.key].toLowerCase() 
          : b[sortConfig.key];
        
        // Traitement spécial pour les dates
        if (sortConfig.key === 'date') {
          const dateA = new Date(aValue);
          const dateB = new Date(bValue);
          
          if (sortConfig.direction === "ascending") {
            return dateA - dateB;
          } else {
            return dateB - dateA;
          }
        }
        
        if (aValue < bValue) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [announcements, sortConfig]);

  const filteredAnnouncements = sortedAnnouncements.filter((announcement) =>
    announcement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    announcement.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append('title', data.title);
      formData.append('content', data.content);
      formData.append('date', data.date);
      
      if (data.file && data.file[0]) {
        formData.append('file', data.file[0]);
      }

      const token = localStorage.getItem("access");
      
      const response = await axios.post(
        "http://localhost:8000/api/announcements/",
        formData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      
      setAnnouncements([response.data, ...announcements]);
      setSuccessMessage("L'annonce a été publiée avec succès !");
      reset();
      
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
      
    } catch (error) {
      console.error('Upload error:', error);
      alert("Erreur lors de la publication. Veuillez réessayer.");
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  };

  return (
    <div className="hr-container">
      <Link to="/" className="back-icon">
        <ArrowLeft size={24} />
      </Link>
      <h1 className="hr-title">Communication RH</h1>

      {successMessage && (
        <div className="success-message">
          <FaCheckCircle className="icon" />
          {successMessage}
        </div>
      )}

      {user?.role === 'admin' && (
        <div className="announcement-form">
          <h2>Publier une nouvelle annonce</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block mb-1 font-medium">Titre *</label>
              <input
                {...register("title")}
                className="w-full input-field"
                placeholder="Titre de l'annonce"
              />
              {errors.title && <p className="error">{errors.title.message}</p>}
            </div>

            <div>
              <label className="block mb-1 font-medium">Contenu *</label>
              <textarea
                {...register("content")}
                className="w-full input-field"
                rows="4"
                placeholder="Contenu détaillé"
              />
              {errors.content && <p className="error">{errors.content.message}</p>}
            </div>

            <div>
              <label className="block mb-1 font-medium">Date *</label>
              <input
                type="date"
                {...register("date")}
                className="w-full input-field"
              />
              {errors.date && <p className="error">{errors.date.message}</p>}
            </div>

            <div>
              <label className="block mb-1 font-medium">
                <FaFileUpload className="inline mr-1" /> Pièce jointe
              </label>
              <div className="file-upload-container">
                <label className="file-upload-label">
                  {fileWatch?.[0]?.name || "Choisir un fichier"}
                  <input 
                    type="file" 
                    {...register("file")} 
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="submit-button"
            >
              Publier
            </button>
          </form>
        </div>
      )}

      <div className="search-bar">
        <FaSearch className="search-icon" />
        <input
          type="text"
          placeholder="Rechercher une annonce..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="table-container">
        {loading ? (
          <div className="loading">Chargement en cours...</div>
        ) : error ? (
          <div className="error">{error}</div>
        ) : (
          <table className="announcements-table">
            <thead>
              <tr>
                <th 
                  onClick={() => requestSort("date")}
                  className={`sort-header ${sortConfig.key === 'date' ? 'active' : ''}`}
                >
                  Date 
                  {sortConfig.key === 'date' && (
                    <span className="sort-direction">
                      {sortConfig.direction === 'ascending' ? '↑' : '↓'}
                    </span>
                  )}
                </th>
                <th 
                  onClick={() => requestSort("title")}
                  className={`sort-header ${sortConfig.key === 'title' ? 'active' : ''}`}
                >
                  Titre
                  {sortConfig.key === 'title' && (
                    <span className="sort-direction">
                      {sortConfig.direction === 'ascending' ? '↑' : '↓'}
                    </span>
                  )}
                </th>
                <th>Fichier</th>
              </tr>
            </thead>
            <tbody>
              {filteredAnnouncements.length === 0 ? (
                <tr>
                  <td colSpan="3" className="no-results">
                    Aucune annonce trouvée
                  </td>
                </tr>
              ) : (
                filteredAnnouncements.map((announcement) => (
                  <tr key={announcement.id}>
                    <td>{formatDate(announcement.date)}</td>
                    <td>
                      <div className="announcement-title">{announcement.title}</div>
                      <div className="announcement-content">{announcement.content}</div>
                    </td>
                    <td>
                      {announcement.file ? (
                        <a
                          href={announcement.file}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="file-link"
                        >
                          Télécharger
                        </a>
                      ) : (
                        <span className="no-file">Aucun fichier</span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default HRCommunication;