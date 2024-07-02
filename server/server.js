const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());
app.use(cors());

let latestMessage = { message: "", timestamp: "" };

// Webhook endpoint to receive messages from message-sender
app.post('/webhook', (req, res) => {
    latestMessage = req.body;
    console.log('Received message:', latestMessage);
    // Forward the message to message-receiver using another webhook
    axios.post('http://localhost:3000/webhook', latestMessage)
        .then(response => {
            console.log('Forwarded message to message-receiver:', response.data);
        })
        .catch(error => {
            console.error('Error forwarding message:', error);
        });
    res.status(200).json({ status: 'Message received' });
});

// Endpoint to retrieve the latest message for message-receiver
app.get('/get-message', (req, res) => {
    res.status(200).json(latestMessage);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
