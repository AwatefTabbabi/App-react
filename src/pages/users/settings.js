import React, { useState } from "react";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaFileUpload,
  FaCheckCircle
} from "react-icons/fa";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ArrowLeft } from "lucide-react";
import * as yup from "yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const schema = yup.object().shape({
  name: yup.string().required("Le nom est obligatoire"),
  email: yup.string().email("Email invalide").required("L'email est obligatoire"),
  phone: yup.string().required("Le numéro de téléphone est obligatoire"),
  complaintType: yup.string().required("Veuillez sélectionner un type de réclamation"),
  details: yup.string().required("Veuillez détailler votre réclamation"),
  file: yup.mixed().nullable(),
});

const Settings = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("phone", data.phone);
      formData.append("complaint_type", data.complaintType); // correspond au champ Django
      formData.append("details", data.details);
      if (data.file && data.file[0]) {
        formData.append("file", data.file[0]);
      }

      const token = localStorage.getItem("access");// Récupérer le token stocké

// La requête reste inchangée (sans header Authorization)
const response = await axios.post(
  "http://localhost:8000/api/ajouter/",
  formData,
  {
    headers: {
                'Authorization': `Bearer ${token}`,

      "Content-Type": "multipart/form-data",
    },
  }
);

      console.log("Réclamation envoyée :", response.data);
      setSuccessMessage("Votre réclamation a été soumise avec succès.");

      setTimeout(() => {
        navigate("/confirmation");
      }, 2000);
    } catch (error) {
      console.error("Erreur :", error);
      alert("Erreur lors de l’envoi. Veuillez réessayer.");
    }
  };

  return (
    <div className="settings-container ">
      <Link to="/" className="back-icon mb-4 inline-block">
        <ArrowLeft size={24} />
      </Link>
      <h2 className="text-2xl font-bold mb-6">Formulaire de Réclamation</h2>

      {successMessage && (
        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6">
          <FaCheckCircle className="inline-block mr-2" />
          {successMessage}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Nom */}
        <div>
          <label className="block mb-1 font-medium">
            <FaUser className="inline mr-1" /> Nom et prénom *
          </label>
          <input
            {...register("name")}
            className="w-full border rounded p-2"
            placeholder="Votre nom"
          />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        </div>

        {/* Email */}
        <div>
          <label className="block mb-1 font-medium">
            <FaEnvelope className="inline mr-1" /> Email *
          </label>
          <input
            type="email"
            {...register("email")}
            className="w-full border rounded p-2"
            placeholder="email@example.com"
          />
          {errors.email && <p className="text-red-500">{errors.email.message}</p>}
        </div>

        {/* Téléphone */}
        <div>
          <label className="block mb-1 font-medium">
            <FaPhone className="inline mr-1" /> Téléphone *
          </label>
          <input
            {...register("phone")}
            className="w-full border rounded p-2"
            placeholder="Votre téléphone"
          />
          {errors.phone && <p className="text-red-500">{errors.phone.message}</p>}
        </div>

        {/* Type de réclamation */}
        <div>
          <label className="block mb-1 font-medium">Type de réclamation *</label>
          <select
            {...register("complaintType")}
            className="w-full border rounded p-2"
          >
            <option value="">-- Sélectionnez --</option>
            <option value="retard">Retard d'acceptation</option>
            <option value="document">Problème document</option>
            <option value="absence">Absence non validée</option>
            <option value="autre">Autre</option>
          </select>
          {errors.complaintType && (
            <p className="text-red-500">{errors.complaintType.message}</p>
          )}
        </div>

        {/* Détails */}
        <div>
          <label className="block mb-1 font-medium">Détails *</label>
          <textarea
            {...register("details")}
            className="w-full border rounded p-2"
            rows="4"
            placeholder="Décrivez votre réclamation"
          />
          {errors.details && (
            <p className="text-red-500">{errors.details.message}</p>
          )}
        </div>

        {/* Fichier */}
        <div>
          <label className="block mb-1 font-medium">
            <FaFileUpload className="inline mr-1" /> Pièce jointe
          </label>
          <input type="file" {...register("file")} className="w-full" />
        </div>

        {/* Bouton */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700 transition"
        >
          Envoyer
        </button>
      </form>
    </div>
  );
};

export default Settings;
