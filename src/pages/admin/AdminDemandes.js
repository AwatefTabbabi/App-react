import React, { useEffect, useState } from "react";
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from "axios";
import "./AdminDemandes.css";

const AdminDemandes = () => {
  const [demandes, setDemandes] = useState({ 
    absences: [], 
    documents: [],
    stats: { total: 0, pending: 0 }
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('access');
      if (!token) {
        setError("Authentification requise");
        setLoading(false);
        return;
      }
     
      try {
        const response = await axios.get('http://localhost:8000/api/demandes/', {
          headers: { 
            'Authorization': `Bearer ${token}`
          }
        });
        console.log(response.data);
        const pendingAbs = response.data.absences?.filter(a => a.status === 'pending').length || 0;
        const pendingDocs = response.data.documents?.filter(d => d.status === 'pending').length || 0;

        setDemandes({
          absences: response.data.absences || [],
          documents: response.data.documents || [],
          stats: {
            total: (response.data.absences?.length || 0) + (response.data.documents?.length || 0),
            pending: pendingAbs + pendingDocs
          }
        });

      } catch (error) {
        handleFetchError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleFetchError = (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('access');
      setError("Session expirée - Veuillez vous reconnecter");
    } else {
      setError(`Erreur: ${error.message}`);
    }
  };

  const handleStatusChange = async (type, id, newStatus) => {
    try {
      const endpoint = type === 'absence' 
        ? `http://localhost:8000/api/absences/${id}/update/`
        : `http://localhost:8000/api/documents/${id}/update/`;

      await axios.patch(endpoint, 
        { status: newStatus },
        { headers: { 
          'Authorization': `Bearer ${localStorage.getItem('access')}`,
          'Content-Type': 'application/json'
        }}
      );

      updateLocalState(type, id, newStatus);
      setDemandes(prev => ({ ...prev, stats: { ...prev.stats, pending: prev.stats.pending - 1 }}));
    } catch (error) {
      console.error("Erreur de mise à jour:", error);
    }
  };

  const updateLocalState = (type, id, newStatus) => {
    const updateFn = (prev) => {
      const key = type === 'absence' ? 'absences' : 'documents';
      const updatedRequests = prev[key].map(req => 
        req.id === id ? { ...req, status: newStatus } : req
      );

      const pendingCount = updatedRequests.filter(r => r.status === 'pending').length;
      
      const totalPending = pendingCount + prev.stats.pending - prev[key].filter(r => r.id === id && r.status === 'pending').length;

      return {
        ...prev,
        [key]: updatedRequests,
        stats: {
          total: prev.stats.total,
          pending: totalPending
        }
      };
    };

    setDemandes(updateFn);
  };

  if (loading) return <div className="loading">Chargement en cours...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="admin-container">
      <Link to="/" className="back-link">
        <ArrowLeft size={24} />
      </Link>

      <h1 className="main-title">Gestion des Demandes Administratives</h1>

      <div className="stats-section">
        <div className="stat-card">
          <h3>Total des demandes</h3>
          <p>{demandes.stats.total}</p>
        </div>
        <div className="stat-card">
          <h3>Demandes en attente</h3>
          <p>{demandes.stats.pending}</p>
        </div>
      </div>

      <div className="requests-section">
        <h2 className="section-title">Demandes d'Absence</h2>
        <div className="requests-grid">
          {demandes.absences.map(request => (
            <div key={`abs-${request.id}`} className="request-card">
              <div className="request-header">
                <span className="employee">{request.user_name}</span>
                <div className="status-container">
                  <div className="action-buttons">
                    {request.status === 'pending' && (
                      <>
                        <button 
                          onClick={() => handleStatusChange('absence', request.id, 'approved')}
                          className="btn-approve">
                          ✓ Approuver
                        </button>
                        <button 
                          onClick={() => handleStatusChange('absence', request.id, 'rejected')}
                          className="btn-reject">
                          ✕ Rejeter
                        </button>
                      </>
                    )}
                  </div>
                  <span className={`status-text ${request.status}`}>
                    {request.status}
                  </span>
                </div>
              </div>
              <div className="request-body">
                <p>Type: {request.type}</p>
                <p>Période: {request.start_date} - {request.end_date}</p>
                {request.comment && <p>Commentaire: {request.comment}</p>}
              </div>
            </div>
          ))}
        </div>

        <h2 className="section-title">Demandes de Documents</h2>
        <div className="requests-grid">
          {demandes.documents.map(request => (
            <div key={`doc-${request.id}`} className="request-card">
              <div className="request-header">
                <span className="employee">{request.user_name}</span>
                <div className="status-container">
                  <div className="action-buttons">
                    {request.status === 'pending' && (
                      <>
                        <button 
                          onClick={() => handleStatusChange('document', request.id, 'approved')}
                          className="btn-approve">
                          ✓ Approuver
                        </button>
                        <button 
                          onClick={() => handleStatusChange('document', request.id, 'rejected')}
                          className="btn-reject">
                          ✕ Rejeter
                        </button>
                      </>
                    )}
                  </div>
                  <span className={`status-text ${request.status}`}>
                    {request.status}
                  </span>
                </div>
              </div>
              <div className="request-body">
                <p>Type: {request.document_type}</p>
                {request.comment && <p>Commentaire: {request.comment}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDemandes;