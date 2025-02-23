// AdminDemandes.js
import React, { useState } from "react";
import { FaSearch, FaSort } from "react-icons/fa";
import "./AdminDemandes.css"; // Import du fichier CSS

// Données de démonstration
const demandesAbsence = [
  {
    id: 1,
    date: "2023-10-01",
    employe: "Jean Dupont",
    statut: "En attente",
    raison: "Maladie",
  },
  {
    id: 2,
    date: "2023-10-05",
    employe: "Marie Curie",
    statut: "Approuvée",
    raison: "Rendez-vous médical",
  },
];

const demandesAttestation = [
  {
    id: 1,
    date: "2023-10-02",
    employe: "Pierre Durand",
    statut: "En attente",
    type: "Attestation de travail",
  },
  {
    id: 2,
    date: "2023-10-06",
    employe: "Sophie Martin",
    statut: "Approuvée",
    type: "Attestation de salaire",
  },
];

const demandesConge = [
  {
    id: 1,
    date: "2023-10-03",
    employe: "Lucie Bernard",
    statut: "En attente",
    periode: "2023-11-01 au 2023-11-07",
  },
  {
    id: 2,
    date: "2023-10-07",
    employe: "Thomas Leroy",
    statut: "Refusée",
    periode: "2023-12-15 au 2023-12-22",
  },
];

const AdminDemandes = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  // Fonction de tri
  const sortedData = (data) => {
    return [...data].sort((a, b) => {
      if (sortConfig.key) {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
      }
      return 0;
    });
  };

  // Fonction de filtrage
  const filteredData = (data) => {
    return data.filter((item) =>
      Object.values(item).some((value) =>
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  };

  // Fonction pour changer le tri
  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  return (
    <div className="admin-demandes-container">
      <div className="admin-demandes-content">
        <h1 className="admin-demandes-title">Gestion des Demandes</h1>

        {/* Barre de recherche */}
        <div className="search-bar">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Rechercher une demande..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        {/* Demandes d'absence */}
        <div className="demandes-section">
          <h2 className="section-title">Demandes d'Absence</h2>
          <Table data={filteredData(sortedData(demandesAbsence))} requestSort={requestSort} />
        </div>

        {/* Demandes d'attestation */}
        <div className="demandes-section">
          <h2 className="section-title">Demandes d'Attestation</h2>
          <Table data={filteredData(sortedData(demandesAttestation))} requestSort={requestSort} />
        </div>

        {/* Demandes de congé */}
        <div className="demandes-section">
          <h2 className="section-title">Demandes de Congé</h2>
          <Table data={filteredData(sortedData(demandesConge))} requestSort={requestSort} />
        </div>
      </div>
    </div>
  );
};

// Composant Table réutilisable
const Table = ({ data, requestSort }) => {
  return (
    <div className="table-container">
      <table className="demandes-table">
        <thead>
          <tr className="table-header">
            <th onClick={() => requestSort("date")}>Date <FaSort className="sort-icon" /></th>
            <th onClick={() => requestSort("employe")}>Employé <FaSort className="sort-icon" /></th>
            <th onClick={() => requestSort("statut")}>Statut <FaSort className="sort-icon" /></th>
            <th>Détails</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id} className="table-row">
              <td>{item.date}</td>
              <td>{item.employe}</td>
              <td>
                <span className={`status-badge ${item.statut.toLowerCase().replace(" ", "-")}`}>
                  {item.statut}
                </span>
              </td>
              <td>{item.raison || item.type || item.periode}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDemandes;