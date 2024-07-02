import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [message, setMessage] = useState('');

  const sendMessage = () => {
    const timestamp = new Date().toLocaleString();
    axios.post('http://localhost:3001/webhook', { message, timestamp })
      .then(response => {
        console.log('Success:', response.data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  return (
    <div>
      <h1>Send a Message</h1>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message here"
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default App;
