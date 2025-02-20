import React, { useState, useEffect } from "react";
import "./App.css";
import SideBar from "./components/Sidebar/SideBar";
import Navbar from "./components/Navbar";
import SplashScreen from "./SplashScreen";
import HRCommunication from "./pages/users/HRCommunication";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ContactInfo from "./pages/users/ContactInfo";
import AbsenceRequest from "./pages/users/AbsenceRequest";
import Login from "./pages/Login";
import ContractDetails from "./pages/users/ContractDetails";
import EmployeeDetails from "./pages/users/EmployeeDetails";
import SignUp from "./pages/SignUp";
import EmployerProfile from "./pages/users/EmployerProfile";
import TrainingCatalog from "./pages/users/TrainingCatalog";

import DonneesAdministratives from "./pages/users/DonneesAdministratives";
import DocumentRequest from "./pages/users/DocumentRequest";
import AbsenceCancellation from "./pages/users/AbsenceCancellation";

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
          {role === "admin" ? (
            
            <Routes>
              <Route path="" element={<handleLogin />} />
            </Routes>
            
          ) : (
            <SideBar>
              <Routes>
                <Route path="/profile" element={<EmployerProfile />} />
                <Route path="/demande-absence" element={<AbsenceRequest />} />
                <Route path="/mes-coordonnees" element={<ContactInfo />} />
                <Route path="/ma-formation" element={<TrainingCatalog />} />
                <Route path="/contract-details" element={<ContractDetails />} />
                <Route path="/employee-details" element={<EmployeeDetails />} />
                <Route path="/hr-communication" element={<HRCommunication />} />
                <Route path="/settings/donnees-administratives" element={<DonneesAdministratives />} />
                <Route path="/settings/demande-d-attestation" element={<DocumentRequest />} />
                <Route path="/settings/annulation-d-absence" element={<AbsenceCancellation />} />
              </Routes>
            </SideBar>
          )}
        </>
      ) : (
        <Routes>
          <Route path="/" element={<Login onLogin={handleLogin} />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      )}
    </Router>
  );
}

export default App;
