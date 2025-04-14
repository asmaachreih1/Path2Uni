const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
    mentorName: { type: String, required: true },
    mentorField: { type: String, required: true },
    mentorBackground: { type: String, required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    
  });
  

module.exports = mongoose.model('Job', JobSchema);
