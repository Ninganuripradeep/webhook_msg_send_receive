import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [message, setMessage] = useState('Waiting for message...');
  const [timestamp, setTimestamp] = useState('');

  useEffect(() => {
    const webhookUrl = 'http://localhost:3001/get-message';

    const receiveMessage = async () => {
      try {
        const response = await axios.get(webhookUrl);
        const { message, timestamp } = response.data;
        if (message && timestamp) {
          setMessage(message);
          setTimestamp(timestamp);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    receiveMessage();
  }, []);

  return (
    <div style={styles.container}>
      <div style={styles.messageBox}>
        <p>{message}</p>
        {timestamp && <p>Sent at: {timestamp}</p>}
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f0f0f0'
  },
  messageBox: {
    width: '300px',
    padding: '20px',
    border: '1px solid #000',
    backgroundColor: '#fff',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
    textAlign: 'center'
  }
};

export default App;
