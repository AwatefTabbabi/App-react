// src/components/ChatBotComponent.js
import React, { useEffect } from "react";
import { Widget, addResponseMessage } from "react-chat-widget";
import "react-chat-widget/lib/styles.css";
import FakeChatbot from './FakeChatbot';  

function ChatBotComponent() {
 

  useEffect(() => {
    addResponseMessage("Bonjour ! Je suis votre assistant IA 🤖");
  }, []);

  return (
    
    <><Widget
      handleNewUserMessage={handleNewUserMessage}
      title="Assistant IA"
      subtitle="Posez-moi une question"
      senderPlaceHolder="Écrivez ici..." />
      
      
      <FakeChatbot /></>

    
  );
}

export default ChatBotComponent;
