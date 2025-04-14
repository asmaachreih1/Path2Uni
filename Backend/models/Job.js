const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
    mentorName: { type: String, required: true },
    mentorField: { type: String, required: true },
    mentorBackground: { type: String, required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now }
  });
  

module.exports = mongoose.model('Job', JobSchema);
