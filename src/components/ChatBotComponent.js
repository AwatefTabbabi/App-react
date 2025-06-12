import React, { useEffect } from "react";
import { Widget, addResponseMessage } from "react-chat-widget";
import "react-chat-widget/lib/styles.css";

const staticResponses = {
  absence: "Vous pouvez faire une demande d'absence depuis la section RH.",
  attestation: "Vous pouvez demander une attestation depuis votre espace personnel RH.",
  reclamation: "Veuillez remplir le formulaire dans la section Réclamations.",
  update: "Vous pouvez mettre à jour vos informations dans votre profil.",
  formation: "Les formations disponibles sont listées dans la section Formations.",
  annonce: "Les dernières annonces RH sont dans la page Communication RH.",
};

function ChatBotComponent() {
  const handleNewUserMessage = (message) => {
    const msg = message.toLowerCase();

    if (msg.includes("absence")) {
      addResponseMessage(staticResponses.absence);
    } else if (msg.includes("attestation")) {
      addResponseMessage(staticResponses.attestation);
    } else if (msg.includes("réclamation") || msg.includes("reclamation")) {
      addResponseMessage(staticResponses.reclamation);
    } else if (msg.includes("mise à jour") || msg.includes("update")) {
      addResponseMessage(staticResponses.update);
    } else if (msg.includes("formation")) {
      addResponseMessage(staticResponses.formation);
    } else if (msg.includes("annonce") || msg.includes("communication")) {
      addResponseMessage(staticResponses.annonce);
    } else {
      addResponseMessage("Je n'ai pas compris. Pouvez-vous reformuler ?");
    }
  };

  useEffect(() => {
    addResponseMessage("Bonjour 👋 ! Je suis votre assistant RH.");
  }, []);

  return (
    <Widget
      handleNewUserMessage={handleNewUserMessage}
      title="Assistant RH"
      subtitle="Posez une question sur les services RH"
      senderPlaceHolder="Tapez votre message..."
    />
  );
}

export default ChatBotComponent;
