const cors =require('cors');//l
const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');


//console.log("Loaded ENV:", process.env.MONGODB_URI); // Debugging


const app = express();
const PORT = process.env.PORT || 5001;//l


//  PROPERLY CONFIGURE CORS
app.use(cors({
 // origin: 'http://127.0.0.1:5500', // Allow requests from Live Server
 origin: ["http://127.0.0.1:5500", "http://localhost:5500"],
 //methods: ['GET', 'POST', 'PUT', 'DELETE'],
 methods: "GET,HEAD,PUT,PATCH,POST,DELETE", 
 //allowedHeaders: ['Content-Type', 'Authorization']
 allowedHeaders: "Content-Type,Authorization",
 credentials: true
}));
app.use(cors());//l

//import Routes leen march 2
const authRoutes = require('./routes/authRoutes');//l
app.use('/api', authRoutes);//l




// Serve static files from the Frontend directory
const path = require('path');
app.use(express.static(path.join(__dirname, 'Frontend')));



// Middleware to parse JSON
app.use(express.json());//l
//use Routes leen march 2



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

