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


// ✅ Delete mentor post by ID (Admin only)
exports.deleteMentorPost = async (req, res) => {
  try {
    const postId = req.params.id;
    const deletedPost = await Job.findByIdAndDelete(postId);

    if (!deletedPost) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.json({ message: 'Mentor post deleted successfully' });
  } catch (error) {
    console.error('Error deleting mentor post:', error);
    res.status(500).json({ message: 'Server error while deleting post' });
  }
};

