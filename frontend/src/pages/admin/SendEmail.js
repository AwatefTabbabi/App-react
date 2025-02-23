// SendEmail.js
import React, { useState } from "react";
import emailjs from "emailjs-com";

const SendEmail = () => {
  const [formData, setFormData] = useState({
    name: "", // Nom de l'employé
    requestType: "", // Type de demande
    message: "", // Message de l'employé
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Remplacez ces valeurs par vos identifiants EmailJS
    const serviceID = "VOTRE_SERVICE_ID";
    const templateID = "VOTRE_TEMPLATE_ID";
    const userID = "VOTRE_USER_ID";

    // Données à envoyer à EmailJS
    const emailData = {
      to_name: "Administrateur", // Nom du destinataire (admin)
      from_name: formData.name, // Nom de l'employé
      request_type: formData.requestType, // Type de demande
      message: formData.message, // Message de l'employé
    };

    // Envoyer l'e-mail via EmailJS
    emailjs
      .send(serviceID, templateID, emailData, userID)
      .then((response) => {
        console.log("E-mail envoyé avec succès !", response.status, response.text);
        alert("Votre demande a été envoyée avec succès !");
        setFormData({ name: "", requestType: "", message: "" }); // Réinitialiser le formulaire
      })
      .catch((error) => {
        console.error("Erreur lors de l'envoi de l'e-mail :", error);
        alert("Une erreur s'est produite. Veuillez réessayer.");
      });
  };

  return (
    <div className="email-form-container">
      <h2>Faire une demande</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nom :</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Type de demande :</label>
          <select
            name="requestType"
            value={formData.requestType}
            onChange={handleChange}
            required
          >
            <option value="">Sélectionnez un type</option>
            <option value="absence">Demande d'absence</option>
            <option value="attestation">Demande d'attestation</option>
            <option value="conge">Demande de congé</option>
          </select>
        </div>

        <div className="form-group">
          <label>Message :</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="submit-button">
          Envoyer la demande
        </button>
      </form>
    </div>
  );
};

export default SendEmail;