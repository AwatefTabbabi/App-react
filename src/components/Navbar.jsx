import React, { useState, useEffect } from "react";
import { FiMail, FiBell, FiFileText } from "react-icons/fi";
import { IoIosLogOut } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const Navbar = ({ onLogout }) => {
  const navigate = useNavigate();
  const [role, setRole] = useState("EMPLOYEE"); // Par défaut, "EMPLOYEE"

  useEffect(() => {
    const storedRole = localStorage.getItem("role"); // Récupérer le rôle stocké
    if (storedRole) {
      setRole(storedRole.toUpperCase()); // Met en majuscule pour éviter les erreurs
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    localStorage.removeItem("role"); // Supprime aussi le rôle stocké

    onLogout(); // Mettre à jour l'état d'authentification
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img 
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3G5eOFECKar3jygplN1RJSNBA3hPUIDjQ9g&s" 
          alt="Profile" 
          className="profile-image" 
        />
        <span className="employee-text">{role}</span> {/* Affichage dynamique */}
      </div>
      
      <div className="navbar-right">
        <FiMail className="icon" />
        <FiBell className="icon" />
        <FiFileText className="icon" onClick={() => navigate("/hr-communication")} />
        <IoIosLogOut className="icon logout-icon" onClick={handleLogout} />
      </div>
    </nav>
  );
};

export default Navbar;
