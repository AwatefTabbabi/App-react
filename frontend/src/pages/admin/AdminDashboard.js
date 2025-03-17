import React from "react";

const AdminDashboard = () => {
  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    flexDirection: "column",
  };

  const logoStyle = {
    marginBottom: "20px",
    width: "800",
    height: "auto",
  };

  return (
    <div style={containerStyle}>
      <img src="/logo.png" alt="Logo" style={logoStyle} />
    </div>
  );
};

export default AdminDashboard;
