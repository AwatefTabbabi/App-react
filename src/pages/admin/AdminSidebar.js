import React from "react";
import { Link } from "react-router-dom";
import { FaTachometerAlt, FaUsers, FaUserPlus, FaKey, FaClipboardList, FaFileAlt, FaUserClock, FaCogs, FaBullhorn, FaHistory } from "react-icons/fa";

const AdminSidebar = () => {
  return (
    <div className="sidebar">
      <h2>Admin Panel</h2>
      <ul>
        <li><Link to="/admin/dashboard"><FaTachometerAlt /> Dashboard</Link></li>
        <li><Link to="/admin/employes"><FaUsers /> Employés</Link></li>
        <li><Link to="/admin/ajouter-employe"><FaUserPlus /> Ajouter Employé</Link></li>
        <li><Link to="/admin/roles-permissions"><FaKey /> Rôles & Permissions</Link></li>
        <li><Link to="/admin/demandes-absence"><FaClipboardList /> Demandes Absence</Link></li>
        <li><Link to="/admin/attestations"><FaFileAlt /> Attestations</Link></li>
        <li><Link to="/admin/absences"><FaUserClock /> Suivi Absences</Link></li>
        <li><Link to="/admin/settings"><FaCogs /> Paramètres</Link></li>
        <li><Link to="/admin/hr-communication"><FaBullhorn /> Communication</Link></li>
        <li><Link to="/admin/logs"><FaHistory /> Historique</Link></li>
      </ul>
    </div>
  );
};

export default AdminSidebar;
