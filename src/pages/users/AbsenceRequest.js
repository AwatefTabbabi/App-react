import React, { useState } from "react";
import axios from "axios";

const AbsenceRequest = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [comment, setComment] = useState("");
  const [firstDayMorning, setFirstDayMorning] = useState(false);
  const [lastDayAfternoon, setLastDayAfternoon] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("access");
    try {
      await axios.post(
        "http://localhost:8000/api/absences/",
        {
          start_date: startDate,
          end_date: endDate,
          comment,
          first_day_morning: firstDayMorning,
          last_day_afternoon: lastDayAfternoon,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setMessage("Demande d'absence envoyée !");
      setStartDate("");
      setEndDate("");
      setComment("");
      setFirstDayMorning(false);
      setLastDayAfternoon(false);
    } catch (error) {
      setMessage("Erreur lors de l'envoi de la demande.");
    }
  };

  return (
    <div>
      <h2>Nouvelle demande d'absence</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Date début :</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Date fin :</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Commentaire :</label>
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              checked={firstDayMorning}
              onChange={() => setFirstDayMorning(!firstDayMorning)}
            />
            Premier matin inclus
          </label>
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              checked={lastDayAfternoon}
              onChange={() => setLastDayAfternoon(!lastDayAfternoon)}
            />
            Dernier après-midi inclus
          </label>
        </div>
        <button type="submit">Envoyer la demande</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AbsenceRequest;