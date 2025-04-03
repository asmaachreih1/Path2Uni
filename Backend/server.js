
require('dotenv').config();  // This loads the .env file

const mongoose = require('mongoose');
const express = require('express');

const checklistRoutes = require('./routes/checklistRoutes');

const app = express();
const PORT = process.env.PORT || 5001;


const authRoutes = require('./routes/authRoutes');

const jobRoutes = require('./routes/jobRoutes');

const cors =require('cors');
app.use(cors());

// Middleware to parse JSON
app.use(express.json());
app.use('/api', authRoutes);

//Routes
app.use('/jobs', jobRoutes);
console.log('Job routes loaded');

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
