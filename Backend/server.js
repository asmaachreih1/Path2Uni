require('dotenv').config();
console.log("Loaded ENV:", process.env.MONGODB_URI); // Debugging


const mongoose = require('mongoose');
const express = require('express');

const app = express();
const PORT = process.env.PORT || 5001;//l


//import Routes leen march 2
const authRoutes = require('./routes/authRoutes');//l
const userRoutes = require('./routes/userRoutes');

const cors =require('cors');//l
app.use(cors());//l

// Serve static files from the Frontend directory
const path = require('path');
app.use(express.static(path.join(__dirname, 'Frontend')));


// Route to serve the password reset page correctly
app.get('/reset-password/:token', (req, res) => {
  res.sendFile(path.join(__dirname, 'Frontend', 'features', 'confirmpassword', 'confirmpassword.html'));
});

// Middleware to parse JSON
app.use(express.json());//l
//use Routes leen march 2
app.use('/api', authRoutes);//l
app.use('/api/user', userRoutes);

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

