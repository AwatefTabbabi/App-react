import React, { useEffect } from "react";
import { Widget, addResponseMessage } from "react-chat-widget";
import "react-chat-widget/lib/styles.css";
import FakeChatbot from './FakeChatbot';  
function ChatBotComponent() {
  useEffect(() => {
    addResponseMessage("Bonjour ! Je suis votre assistant IA 🤖");
  }, []);

  // 🟢 Define the missing function here
  const handleNewUserMessage = (newMessage) => {
    console.log(`User said: ${newMessage}`);
    // You can add logic here to simulate a response
    addResponseMessage("Merci pour votre message. Nous vous répondrons bientôt !");
  };

  return (
    <Widget
      handleNewUserMessage={handleNewUserMessage} // ✅ No more error
      title="Assistant IA"
      subtitle="Posez-moi une question"
      senderPlaceHolder="Écrivez ici..."
    />
  );
}

export default ChatBotComponent;
