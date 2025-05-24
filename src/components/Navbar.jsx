import React, { useState, useEffect } from "react";
import { FiFileText } from "react-icons/fi";
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
    // Afficher une boîte de dialogue de confirmation
    const confirmLogout = window.confirm("Voulez-vous vraiment vous déconnecter ?");
    
    // Si l'utilisateur annule, ne rien faire
    if (!confirmLogout) return;
  
    // Si l'utilisateur confirme, procéder à la déconnexion
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
      <FiFileText className="icon" onClick={() => navigate("/hr-communication")} />

        {/* 🔹 Afficher FiFileText uniquement si c'est un ADMIN */}
        {role === "ADMIN" && (
          <>
          {/* <FiMail className="icon" onClick={() => navigate("/AdminEmails")} />
           
           <FiBell className="icon" onClick={() => navigate("/catalogue")} />*/}
           <FiBell className="icon" onClick={() => navigate("/AdminDemandes")} /> 
          </>
        )}

        <IoIosLogOut className="icon logout-icon" onClick={handleLogout} />
      </div>
    </nav>
  );
};
export default Navbar;