import React from "react";

const AdminDashboard = () => {
  const logoStyle = {
    width: "800px", // Augmenté pour une meilleure visibilité
    height: "auto",
    marginBottom: "20px",
    display: "block",
    margin: "0 auto",
    marginTop: "20vh",
  };

  return (
    <img src="/logo.png" alt="Logo" style={logoStyle} />
  );
};

export default AdminDashboard;
