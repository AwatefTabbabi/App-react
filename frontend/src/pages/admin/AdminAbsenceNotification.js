// src/pages/admin/AdminAbsenceNotification.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AdminAbsenceNotification() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Fetch absence notifications from backend
    const fetchNotifications = async () => {
      try {
        const response = await axios.get('/api/absence-notifications');
        setNotifications(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des notifications', error);
      }
    };

    fetchNotifications();
  }, []);

  const handleNotificationAction = async (notificationId, action) => {
    try {
      await axios.post(`/api/absence-notifications/${notificationId}/${action}`);
      // Mettre à jour la liste des notifications
      setNotifications(notifications.filter(n => n.id !== notificationId));
    } catch (error) {
      console.error('Erreur lors du traitement de la notification', error);
    }
  };

  return (
    <div className="admin-absence-notification">
      <h2>Notifications de demandes d'absence</h2>
      {notifications.length === 0 ? (
        <p>Aucune nouvelle notification</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Employé</th>
              <th>Type d'absence</th>
              <th>Dates</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {notifications.map(notification => (
              <tr key={notification.id}>
                <td>{notification.employeeName}</td>
                <td>{notification.absenceType}</td>
                <td>{notification.dates}</td>
                <td>
                  <button onClick={() => handleNotificationAction(notification.id, 'approve')}>
                    Approuver
                  </button>
                  <button onClick={() => handleNotificationAction(notification.id, 'reject')}>
                    Rejeter
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default AdminAbsenceNotification;