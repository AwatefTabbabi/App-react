import React, { useState, useEffect } from "react";
import { FaSearch, FaSort, FaFileUpload, FaCheckCircle } from "react-icons/fa";
import "./HRCommunication.css";
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";

const schema = yup.object().shape({
  title: yup.string().required("Le titre est obligatoire"),
  content: yup.string().required("Le contenu est obligatoire"),
  date: yup.string().required("La date est obligatoire"),
  file: yup.mixed().nullable(),
});

const HRCommunication = () => {
  const { user } = useAuth();
  const [announcements, setAnnouncements] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [successMessage, setSuccessMessage] = useState("");
  
  const { 
    register, 
    handleSubmit, 
    formState: { errors }, 
    reset,
    watch 
  } = useForm({
    resolver: yupResolver(schema),
  });

  const fileWatch = watch("file");

  useEffect(() => {
    // Simuler un appel API pour récupérer les annonces
    const mockAnnouncements = [
      {
        id: 1,
        title: "Congés d'été",
        content: "Planning des congés d'été 2023",
        date: "2023-06-15",
        file: null
      },
      {
        id: 2,
        title: "Nouvelle politique RH",
        content: "Mise à jour de la politique des congés",
        date: "2023-05-20",
        file: "/documents/politique.pdf"
      }
    ];
    setAnnouncements(mockAnnouncements);
  }, []);

  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") direction = "desc";
    setSortConfig({ key, direction });
  };

  const sortedAnnouncements = [...announcements].sort((a, b) => {
    if (sortConfig.key) {
      if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === "asc" ? -1 : 1;
      if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === "asc" ? 1 : -1;
    }
    return 0;
  });

  const filteredAnnouncements = sortedAnnouncements.filter((announcement) =>
    announcement.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append('title', data.title);
      formData.append('content', data.content);
      formData.append('date', data.date);
      
      if (data.file && data.file[0]) {
        formData.append('file', data.file[0]);
      }

      const token = localStorage.getItem("access");
      
      // Simuler une réponse API réussie
      setSuccessMessage("L'annonce a été publiée avec succès !");
      reset();
      
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
      
        const response = await axios.post(
        "http://localhost:8000/api/announcements/",
        formData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      
      setAnnouncements([response.data, ...announcements]);
      setSuccessMessage("L'annonce a été publiée avec succès !");
      reset();
      
      
    } catch (error) {
      console.error('Upload error:', error);
      alert("Erreur lors de la publication. Veuillez réessayer.");
    }
  };

  return (
    <div className="hr-container">
      <Link to="/" className="back-icon">
        <ArrowLeft size={24} />
      </Link>
      <h1 className="hr-title">Communication RH</h1>

      {successMessage && (
        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6">
          <FaCheckCircle className="inline-block mr-2" />
          {successMessage}
        </div>
      )}

      {user?.role === 'admin' && (
        <div className="announcement-form">
          <h2>Publier une nouvelle annonce</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Titre */}
            <div>
              <label className="block mb-1 font-medium">Titre *</label>
              <input
                {...register("title")}
                className="w-full border rounded p-2"
                placeholder="Titre de l'annonce"
              />
              {errors.title && <p className="text-red-500">{errors.title.message}</p>}
            </div>

            {/* Contenu */}
            <div>
              <label className="block mb-1 font-medium">Contenu *</label>
              <textarea
                {...register("content")}
                className="w-full border rounded p-2"
                rows="4"
                placeholder="Contenu détaillé"
              />
              {errors.content && <p className="text-red-500">{errors.content.message}</p>}
            </div>

            {/* Date */}
            <div>
              <label className="block mb-1 font-medium">Date *</label>
              <input
                type="date"
                {...register("date")}
                className="w-full border rounded p-2"
              />
              {errors.date && <p className="text-red-500">{errors.date.message}</p>}
            </div>

            {/* Fichier */}
            <div>
              <label className="block mb-1 font-medium">
                <FaFileUpload className="inline mr-1" /> Pièce jointe
              </label>
              <div className="file-upload-container">
                <label className="file-upload-label">
                  {fileWatch?.[0]?.name || "Choisir un fichier"}
                  <input 
                    type="file" 
                    {...register("file")} 
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700 transition"
            >
              Publier
            </button>
          </form>
        </div>
      )}

      {/* Barre de recherche et tableau */}
      <div className="search-bar">
        <FaSearch className="search-icon" />
        <input
          type="text"
          placeholder="Rechercher une annonce..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th onClick={() => requestSort("date")}>
                Date <FaSort className="sort-icon" />
              </th>
              <th onClick={() => requestSort("title")}>
                Titre <FaSort className="sort-icon" />
              </th>
              <th>Fichier</th>
            </tr>
          </thead>
          <tbody>
            {filteredAnnouncements.map((announcement) => (
              <tr key={announcement.id}>
                <td>{new Date(announcement.date).toLocaleDateString()}</td>
                <td>{announcement.title}</td>
                <td>
                  {announcement.file ? (
                    <a
                      href={announcement.file}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      Télécharger
                    </a>
                  ) : (
                    <span className="text-gray-400">Aucun fichier</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HRCommunication;