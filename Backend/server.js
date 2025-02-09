require('dotenv').config();  // This loads the .env file
const mongoose = require('mongoose');
const express = require('express');

const app = express();
const PORT = 5001;

// Mongo URI from .env file
const mongoURI = process.env.MONGODB_URI;

// Check if mongoURI is undefined
if (!mongoURI) {
  console.error("Mongo URI is undefined");
  process.exit(1);
}

// Connect to MongoDB
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB Connected Successfully!'))
.catch((err) => console.error('MongoDB Connection Failed:', err));

// Basic route
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
