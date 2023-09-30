import React, { useState } from 'react';

const UserInput = () => {
  const [userMessage, setUserMessage] = useState('');

  const handleInputChange = (e) => {
    setUserMessage(e.target.value);
  };

  const handleSendMessage = () => {
    // Handle sending user messages here
  };

  return (
    <div className="user-input">
      <input
        type="text"
        placeholder="Type your message..."
        value={userMessage}
        onChange={handleInputChange}
      />
      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
};

export default UserInput;
