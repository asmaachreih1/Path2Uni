
require('dotenv').config();  // This loads the .env file

const mongoose = require('mongoose');
const express = require('express');
const path = require('path');
const cors = require('cors');
const taskRoutes = require('./routes/taskRoutes');
const checklistRoutes = require('./routes/checklistRoutes');
const authRoutes = require('./routes/authRoutes');
const jobRoutes = require('./routes/jobRoutes');
const adminRoutes = require('./routes/adminRoutes');//new 14/4


const app = express();
const PORT = process.env.PORT || 5001;

// CORS setup
app.use(cors({ origin: '*', credentials: true }));

// Middleware to parse JSON
app.use(express.json());

// API Routes
app.use('/api', authRoutes);
app.use('/jobs', jobRoutes);
app.use('/api/admin', adminRoutes);//new 14/4
console.log('Job routes loaded');


console.log('Admin routes loaded');//new 14/4


// Mongo URI from .env file
const mongoURI = process.env.MONGODB_URI;
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

// ✅ Serve static frontend files
app.use(express.static(path.join(__dirname, '../Frontend')));

// ✅ Catch-all route to serve index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../Frontend/index.html'));
});

// ✅ Start the server after everything is set up
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
