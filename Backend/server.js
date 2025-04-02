require('dotenv').config();  // This loads the .env file

const express = require('express');
const mongoose = require('mongoose');

const cors =require('cors');//l
const authRoutes = require('./routes/authRoutes');//l
const jobRoutes = require('./routes/jobRoutes');

const app = express();

// Middleware to parse JSON
app.use(express.json());//l
//app.use(cors());
app.use(cors({
  origin: 'http://127.0.0.1:5500', // allow Live Server
  credentials: true
}));
//l


//Routes
app.use('/api', authRoutes);//l
app.use('/jobs', jobRoutes);
console.log('Job routes loaded');


const PORT = process.env.PORT || 5001;//l
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
