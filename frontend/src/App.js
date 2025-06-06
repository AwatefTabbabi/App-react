import React, { useState, useEffect } from "react";
import "./App.css";
import ForgotPassword from "./pages/ForgotPassword";
import SideBar from "./components/Sidebar/SideBar";
import AdminSidebar from "./components/Sidebar/AdminSidebar"; // 🔹 Sidebar Admin ajoutée
import Navbar from "./components/Navbar";
import SplashScreen from "./SplashScreen";
import HRCommunication from "./pages/users/HRCommunication";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import ContactInfo from "./pages/users/ContactInfo";
import AbsenceRequest from "./pages/users/AbsenceRequest";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import EmployerProfile from "./pages/users/EmployerProfile";
import TrainingCatalog from "./pages/users/TrainingCatalog";
import DonneesAdministratives from "./pages/users/DonneesAdministratives";
import DocumentRequest from "./pages/users/DocumentRequest";
import AbsenceCancellation from "./pages/users/AbsenceCancellation";
import Settings from "./pages/users/settings";
import ChatBotComponent from "./components/ChatBotComponent";

// Pages admin
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminEmails from "./pages/admin/AdminEmails"; 
import Catalogue from "./pages/admin/catalogue";
import AdminDemandes from "./pages/admin/AdminDemandes";
import AdminAbsenceNotification from "./pages/admin/AdminAbsenceNotification";
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState(null);
  const [showSplash, setShowSplash] = useState(true); // Ajout de l'état pour le SplashScreen

  useEffect(() => {
    // Afficher le splash screen pendant 3 secondes puis le masquer
    setTimeout(() => {
      setShowSplash(false);
    }, 3000);
  }, []);

  // Fonction pour gérer la connexion
  const handleLogin = (userRole) => {
    setIsAuthenticated(true);
    setRole(userRole);
  };

  // Fonction pour gérer la déconnexion
  const handleLogout = () => {
    setIsAuthenticated(false);
    setRole(null);
  };

  return (
    <Router>
      {showSplash ? (
        <SplashScreen />
      ) : isAuthenticated ? (
        <>
          <Navbar onLogout={handleLogout} />
          <ChatBotComponent /> 
          {role === "admin" ? (
            <div className="admin-main-container">
              {/* Sidebar à gauche */}
              <div className="admin-sidebar-wrapper">
                <AdminSidebar />
              </div>
              
              {/* Contenu principal à droite */}
              <div className="admin-content-wrapper">
                <Routes>
                  <Route path="/admin" element={<AdminDashboard />} />
                  <Route path="/catalogue" element={<Catalogue />} />
                  <Route path="/admin/absence-notifications" element={<AdminAbsenceNotification />} />
                  <Route path="/AdminDemandes" element={<AdminDemandes />} />
                  <Route path="/AdminEmails" element={<AdminEmails />} />
                  <Route path="/hr-communication" element={<HRCommunication />} />
                  <Route path="*" element={<Navigate to="/admin/dashboard" />} />
                </Routes>
              </div>
            </div>
          ) : (
            <SideBar>
              <Routes>
                <Route path="/profile" element={<EmployerProfile />} />
                <Route path="/demande-absence" element={<AbsenceRequest />} />
                <Route path="/mes-coordonnees" element={<ContactInfo />} />
                <Route path="/ma-formation" element={<TrainingCatalog />} />
                
                <Route path="/hr-communication" element={<HRCommunication />} />
                <Route path="/donnees-administratives" element={<DonneesAdministratives />} />
                <Route path="/demande-d-attestation" element={<DocumentRequest />} />
                <Route path="/annulation-d-absence" element={<AbsenceCancellation />} />
                <Route path="/settings" element={<Settings />} />
                
              </Routes>
            </SideBar>
          )}
        </>
      ) : (
        <Routes>
          <Route path="/" element={<Login onLogin={handleLogin} />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="*" element={<Navigate to="/login" />} /> {/* 🔹 Redirection par défaut */}
        </Routes>
      )}
    </Router>
  );
}

export default App;
