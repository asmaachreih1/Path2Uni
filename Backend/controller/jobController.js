const Job = require('../models/Job');

exports.createJob = async (req, res) => {
  try {
    const job = new Job({
      title: req.body.title,
      description: req.body.description,
      company: req.body.company,
      postedBy: req.user._id // Set from auth middleware
    });
    await job.save();
    res.status(201).json(job);
  } catch (err) {
    res.status(500).json({ message: 'Failed to post job', error: err.message });
  }
};

exports.getAllJobs = async (req, res) => {
  const jobs = await Job.find().populate('postedBy', 'email');
  res.json(jobs);
};
