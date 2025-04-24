// src/components/ChatBotComponent.js
import React, { useEffect } from "react";
import { Widget, addResponseMessage } from "react-chat-widget";
import "react-chat-widget/lib/styles.css";

function ChatBotComponent() {
  const handleNewUserMessage = async (message) => {
    try {
      const response = await fetch("http://localhost:8000/api/hf-chat/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
    });

      const data = await response.json();
      addResponseMessage(data.response || "Je n'ai pas compris votre message.");
    } catch (error) {
      addResponseMessage("Erreur lors de la communication avec l'assistant.");
    }
  };

  useEffect(() => {
    addResponseMessage("Bonjour ! Je suis votre assistant IA 🤖");
  }, []);

  return (
    <Widget
      handleNewUserMessage={handleNewUserMessage}
      title="Assistant IA"
      subtitle="Posez-moi une question"
      senderPlaceHolder="Écrivez ici..."
    />
  );
}

export default ChatBotComponent;
