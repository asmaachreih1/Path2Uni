const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://asmaachreih:Asmaa123@cluster0.l0745.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB Connected Successfully!'))
.catch((err) => console.error('MongoDB Connection Failed:', err));


module.exports = connectDB;
