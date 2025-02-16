require('dotenv').config();  // This loads the .env file
const mongoose = require('mongoose');
const express = require('express');

const app = express();
const PORT = process.env.PORT || 5001;//l

const authRoutes = require('./routes/authRoutes');//l
// Middleware to parse JSON
app.use(express.json());//l
app.use('/api', authRoutes);//l


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
