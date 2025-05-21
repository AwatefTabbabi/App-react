import React, { useState, useEffect } from "react";
import { FaSearch, FaSort, FaUpload } from "react-icons/fa";
import "./HRCommunication.css";
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useAuth } from '../../context/AuthContext'; // Chemin vérifié

const HRCommunication = () => {
  const { user } = useAuth();
  console.log('user auth : ', user)
  const [announcements, setAnnouncements] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [newAnnouncement, setNewAnnouncement] = useState({
    title: '',
    content: '',
    date: '',
    file: null
  });

  useEffect(() => {
    fetch('/api/announcements/')
      .then(data => setAnnouncements(data))
      .catch(error => console.log('Error:', error));
  }, []);

  // Déclaration correcte des fonctions dans l'ordre
  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") direction = "desc";
    setSortConfig({ key, direction });
  };

  const sortedAnnouncements = [...announcements].sort((a, b) => {
    if (sortConfig.key) {
      if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === "asc" ? -1 : 1;
      if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === "asc" ? 1 : -1;
    }
    return 0;
  });

  const filteredAnnouncements = sortedAnnouncements.filter((announcement) =>
    announcement.title.toLowerCase().includes(searchTerm.toLowerCase())
  );


  const handleFileUpload = (e) => {
    setNewAnnouncement({
      ...newAnnouncement,
      file: e.target.files[0]
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  const formData = new FormData();
  formData.append('title', newAnnouncement.title);
  formData.append('content', newAnnouncement.content);
  formData.append('date', newAnnouncement.date);
  formData.append('file', newAnnouncement.file); 
    
    try {
      const response = await fetch('/api/announcements/', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access')}`
        },
        body: formData
      });

      if (response.ok) {
        const result = await response.json();
        setAnnouncements([result, ...announcements]);
        setNewAnnouncement({ title: '', content: '', date: '', file: null });
      }
    } catch (error) {
      console.error('Upload error:', error);
    }
  };

  return (
    <div className="hr-container">
      <Link to="/" className="back-icon">
        <ArrowLeft size={24} />
      </Link>
      <h1 className="hr-title">Communication RH</h1>

      {user?.role === 'admin' && (
        <div className="announcement-form">
          <h2>Publier une nouvelle annonce</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Titre"
              value={newAnnouncement.title}
              onChange={(e) => setNewAnnouncement({ ...newAnnouncement, title: e.target.value })}
              required
            />
            <textarea
              placeholder="Contenu"
              value={newAnnouncement.content}
              onChange={(e) => setNewAnnouncement({ ...newAnnouncement, content: e.target.value })}
              required
            />
            <input
              type="date"
              value={newAnnouncement.date}
              onChange={(e) => setNewAnnouncement({ ...newAnnouncement, date: e.target.value })}
              required
            />
            <div className="file-upload">
              <label>
                <FaUpload /> Joindre un fichier
                <input type="file" onChange={handleFileUpload} hidden />
              </label>
              {newAnnouncement.file && <span>{newAnnouncement.file.name}</span>}
            </div>
            <button type="submit">Publier</button>
          </form>
        </div>
      )}

      {/* Barre de recherche et tableau */}
      <div className="search-bar">
        <FaSearch className="search-icon" />
        <input
          type="text"
          placeholder="Rechercher une annonce..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th onClick={() => requestSort("date")}>
                Date <FaSort className="sort-icon" />
              </th>
              <th onClick={() => requestSort("title")}>
                Titre <FaSort className="sort-icon" />
              </th>
              <th>Fichier</th>
            </tr>
          </thead>
          <tbody>
            {filteredAnnouncements.map((announcement) => (
              <tr key={announcement.id}>
                <td>{new Date(announcement.date).toLocaleDateString()}</td>
                <td>{announcement.title}</td>
                <td>
                  {announcement.file && (
                    <a
                      href={announcement.file}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Télécharger
                    </a>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HRCommunication;