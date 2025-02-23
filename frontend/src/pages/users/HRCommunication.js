import React, { useState } from "react";
import { FaSearch, FaSort } from "react-icons/fa";
import "./HRCommunication.css";
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react'; // Import de l'icône
const announcements = [
  { id: 1, date: "2024-02-01", title: "Nouvelle politique RH" },
  { id: 2, date: "2024-02-10", title: "Mise à jour des congés" },
  { id: 3, date: "2024-02-15", title: "Formation interne prévue" },
];

const HRCommunication = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

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

  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") direction = "desc";
    setSortConfig({ key, direction });
  };

  return (
    <div className="hr-container">
       {/* Icône Retour */}
       <Link to="/" className="back-icon">
        <ArrowLeft size={24} />
      </Link>
      <h1 className="hr-title">Communication RH</h1>

      {/* Barre de recherche */}
      <div className="search-bar">
        <FaSearch className="search-icon" />
        <input
          type="text"
          placeholder="Rechercher une annonce..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Tableau des annonces */}
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
            </tr>
          </thead>
          <tbody>
            {filteredAnnouncements.map((announcement) => (
              <tr key={announcement.id}>
                <td>{announcement.date}</td>
                <td>{announcement.title}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HRCommunication;
