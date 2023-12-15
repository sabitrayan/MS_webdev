import React, { useState, useEffect, useCallback } from 'react';
import BotResponse from './BotResponse';

const ChatWindow = () => {
  const [messages, setMessages] = useState([]);
  const [userMessage, setUserMessage] = useState('');

  // Simulate bot responses when the component mounts (componentDidMount)
  useEffect(() => {
    const botResponse = getRandomBotResponse();
    addBotMessage(botResponse);
  }, []); // Empty dependency array ensures this effect runs only once

  // Memoize the getRandomBotResponse function to avoid recreating it on each render
  const getRandomBotResponseMemoized = useCallback(getRandomBotResponse, []);

  // Event handler for user input change
  const handleUserInputChange = (e) => {
    setUserMessage(e.target.value);
  };

  // Event handler for user message submission
  const handleSendMessage = () => {
    if (userMessage.trim() !== '') {
      // addBotMessage(userMessage.trim()); // Add the user message to the chat
      // Add the bot response here
      const botResponse = getRandomBotResponseMemoized();
      // addUserMessage();
      setMessages([...messages, { text: userMessage, isUser: true }, { text: botResponse, isUser: false }]);
      // addBotMessage(botResponse);
      console.log(messages)
      setUserMessage(''); // Clear the user input
    }
  };

  // Function to add a user message to the chat
  const addUserMessage = () => {
    if (userMessage.trim() !== '') {
      console.log('userMessage:', userMessage)
      setMessages([...messages, { text: userMessage, isUser: true }]);
    }
  };

  // Function to add a bot message to the chat
  const addBotMessage = (text) => {
    setMessages([...messages, { text, isUser: false }]);
  };

  // Helper function to get a random bot response
  function getRandomBotResponse() {
    const botResponses = [
      'Hello! How can I assist you?',
      'I can help with various tasks. Just ask!',
      'Sorry, I am a basic bot and can only provide limited assistance.',
    ];
    const randomIndex = Math.floor(Math.random() * botResponses.length);
    return botResponses[randomIndex];
  }

  return (
    <div className="chat-window">
      <div className="user-input">
        <input
          type="text"
          placeholder="Type your message..."
          value={userMessage}
          onChange={handleUserInputChange}
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
      {messages.reverse().map((message, index) => (
        <div
          key={index}
          className={`message ${message.isUser ? 'user-message' : 'bot-message'}`}
        >
          {message.isUser ? 'User: ' : 'Bot: '}
          {message.text}
        </div>
      ))}
    </div>
  );
};

export default ChatWindow;
