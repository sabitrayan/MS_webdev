import React, { useState, useEffect } from 'react';
import BotResponse from './BotResponse';

const ChatWindow = () => {
  const [messages, setMessages] = useState([]);
  const [userMessage, setUserMessage] = useState('');

  // Simulate bot responses when the component mounts (componentDidMount)
  useEffect(() => {
    const botResponse = getRandomBotResponse();
    addBotMessage(botResponse);
  }, []); // Empty dependency array ensures this effect runs only once

  // Simulate bot responses when the user sends a message
  useEffect(() => {
    if (userMessage.trim() !== '') {
      const botResponse = getRandomBotResponse();
      addBotMessage(botResponse);
      setUserMessage(''); // Clear the user input
    }
  }, [userMessage]); // Add 'userMessage' to the dependency array

  // Function to add a user message to the chat
  const addUserMessage = () => {
    if (userMessage.trim() !== '') {
      setMessages([...messages, { text: userMessage, isUser: true }]);
    }
  };

  // Function to add a bot message to the chat
  const addBotMessage = (text) => {
    setMessages([...messages, { text, isUser: false }]);
  };

  // Helper function to get a random bot response
  const getRandomBotResponse = () => {
    const botResponses = [
      'Hello! How can I assist you?',
      'I can help with various tasks. Just ask!',
      'Sorry, I am a basic bot and can only provide limited assistance.',
    ];
    const randomIndex = Math.floor(Math.random() * botResponses.length);
    return botResponses[randomIndex];
  };

  return (
    <div className="chat-window">
      {messages.map((message, index) => (
        <BotResponse key={index} text={message.text} />
      ))}
      <div className="user-input">
        <input
          type="text"
          placeholder="Type your message..."
          value={userMessage}
          onChange={(e) => setUserMessage(e.target.value)}
        />
        <button onClick={addUserMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatWindow;
