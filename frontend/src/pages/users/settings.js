import React, { useState } from "react";
import { TextField, Button, Switch, FormControlLabel, Typography, Box, Divider } from "@mui/material";
import "./setings.css";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { FaUser, FaEnvelope, FaPhone, FaFileUpload, FaCheckCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const schema = yup.object().shape({
  name: yup.string().required("Le nom est obligatoire"),
  email: yup.string().email("Email invalide").required("L'email est obligatoire"),
  phone: yup.string().required("Le numéro de téléphone est obligatoire"),
  isClient: yup.boolean(),
  accountNumber: yup.string().when("isClient", {
    is: true,
    then: yup.string().required("Le numéro de compte est obligatoire"),
  }),
  complaintType: yup.string().required("Veuillez sélectionner un type de réclamation"),
  details: yup.string().required("Veuillez détailler votre réclamation"),
  file: yup.mixed().nullable(),
});

const Settings = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const [successMessage, setSuccessMessage] = useState("");
  const isClient = watch("isClient", false);
  const navigate = useNavigate();

  const onSubmit = (data) => {
    console.log("Réclamation envoyée :", data);
    setSuccessMessage("Votre réclamation a été soumise avec succès.");

    setTimeout(() => {
      navigate("/confirmation");
    }, 2000);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-50 to-purple-50">
      <div className="max-w-2xl w-full bg-white p-8 rounded-xl shadow-2xl">
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-800">
          Formulaire de Réclamation
        </h2>
        {successMessage && (
          <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6">
            <FaCheckCircle className="inline-block mr-2" />
            {successMessage}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Nom et prénom */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <FaUser className="inline-block mr-2" />
              Nom et prénom *
            </label>
            <input
              {...register("name")}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Entrez votre nom et prénom"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <FaEnvelope className="inline-block mr-2" />
              E-mail *
            </label>
            <input
              type="email"
              {...register("email")}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Entrez votre e-mail"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Numéro de téléphone */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <FaPhone className="inline-block mr-2" />
              N° de Tél *
            </label>
            <input
              {...register("phone")}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Entrez votre numéro de téléphone"
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
            )}
          </div>

          {/* Êtes-vous client ATB ? */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Êtes-vous client ATB ? *
            </label>
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                {...register("isClient")}
                className="form-checkbox h-5 w-5 text-blue-600"
              />
              <span className="ml-2">Oui</span>
            </label>
          </div>

          {/* Numéro de compte (conditionnel) */}
          {isClient && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Numéro de compte *
              </label>
              <input
                {...register("accountNumber")}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Entrez votre numéro de compte"
              />
              {errors.accountNumber && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.accountNumber.message}
                </p>
              )}
            </div>
          )}

          {/* Type de réclamation */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Type de réclamation *
            </label>
            <select
              {...register("complaintType")}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">-- Sélectionnez --</option>
              <option value="financement">Financement</option>
              <option value="paiement">Paiement</option>
              <option value="monétique">Monétique</option>
              <option value="carteBancaire">Carte Bancaire</option>
              <option value="autre">Autre</option>
            </select>
            {errors.complaintType && (
              <p className="text-red-500 text-sm mt-1">
                {errors.complaintType.message}
              </p>
            )}
          </div>

          {/* Détail de la réclamation */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Détail de la réclamation *
            </label>
            <textarea
              {...register("details")}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="4"
              placeholder="Décrivez votre réclamation en détail"
            />
            {errors.details && (
              <p className="text-red-500 text-sm mt-1">{errors.details.message}</p>
            )}
          </div>

          {/* Pièce jointe */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <FaFileUpload className="inline-block mr-2" />
              Pièce jointe (optionnelle)
            </label>
            <input
              type="file"
              {...register("file")}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Bouton de soumission */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Envoyer
          </button>
        </form>
      </div>
    </div>
  );
};

export default Settings;