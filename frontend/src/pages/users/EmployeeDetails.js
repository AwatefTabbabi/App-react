import React from 'react';

function EmployeeDetails() {
  return (
    <div className="employee-details">
      <h2>Salarié</h2>
      <div>
        <label>Nom: </label>
      </div>
      <div>
        <label>Matricule</label>
      </div>

      <h3>Situation employé</h3>
      <div>
        <label>Catégorie de situation: </label>
      </div>
      <div>
        <label>Classification: </label>
      </div>
      <div>
        <label>Qualification: </label>
      </div>
      <div>
        <label>Dernière embauche: </label>
      </div>
      <div>
        <label>Année: </label>
      </div>
      <div>
        <label>Mois: </label>
      </div>
    </div>
  );
}

export default EmployeeDetails;