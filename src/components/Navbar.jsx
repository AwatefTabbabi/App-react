import React, { useState, useEffect } from "react";
import { FiFileText, FiBell } from "react-icons/fi";
import { IoIosLogOut } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Navbar = ({ onLogout }) => {
  const navigate = useNavigate();
  const [role, setRole] = useState("EMPLOYEE"); // Par défaut, "EMPLOYEE"
  const [notificationCount, setNotificationCount] = useState(0);

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    if (storedRole) {
      setRole(storedRole.toUpperCase());
    }
  }, []);

  // Récupérer le nombre de notifications pour l'admin
  useEffect(() => {
    if (role === "ADMIN") {
      axios
        .get("http://localhost:8000/api/admin/unread-requests-count/")
        .then((res) => setNotificationCount(res.data.count))
        .catch(() => setNotificationCount(0));
    }
  }, [role]);

  const handleLogout = () => {
    const confirmLogout = window.confirm("Voulez-vous vraiment vous déconnecter ?");
    if (!confirmLogout) return;
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    localStorage.removeItem("role");
    onLogout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3G5eOFECKar3jygplN1RJSNBA3hPUIDjQ9g&s"
          alt="Profile"
          className="profile-image"
          style={{ cursor: "pointer" }}
          onClick={handleLogout}
        />
        <span className="employee-text">{role}</span>
      </div>

      <div className="navbar-right">
        <FiFileText className="icon" onClick={() => navigate("/hr-communication")} />
        {role === "ADMIN" && (
          <div style={{ position: "relative", display: "inline-block" }}>
            <FiBell className="icon" onClick={() => navigate("/AdminDemandes")} />
            {notificationCount > 0 && (
              <span className="notification-badge">{notificationCount}</span>
            )}
          </div>
        )}
        <IoIosLogOut className="icon" onClick={handleLogout} />
      </div>
    </nav>
  );
};

export default Navbar;