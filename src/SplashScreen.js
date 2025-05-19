import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "./SplashScreen.css"; // Import du fichier CSS
const SplashScreen = () => {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setVisible(false);
      navigate("/"); // Redirige vers la page principale
    }, 3000); // Durée du splash screen (3s)
  }, [navigate]);

  return (
    visible && (
      <motion.div
        className="splash-screen"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 1.2 }}
        transition={{ duration: 1 }}
      >
        {/* Lien direct vers l'image dans public */}
        <img src="/logo.png" alt="Logo" className="logo" />
       
      </motion.div>
    )
  );
};

export default SplashScreen;
