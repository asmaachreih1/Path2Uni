const express = require('express');
const router = express.Router();
const Job = require('../models/Job');
const { authMiddleware } = require('../middleware/authMiddleware'); // ✅ fixed


// ✅ GET all mentor posts
router.get('/mentors/posts', async (req, res) => {
    try {
        const posts = await Job.find().populate('postedBy', 'email');
        if (posts.length === 0) {
            return res.status(200).json({ message: 'No mentor insights available yet.', posts: [] });
        }
        res.json(posts);
    } catch (error) {
        res.status(500).json({ message: 'Failed to load mentor insights. Please refresh the page.', error });
    }
});

// ✅ POST create a new mentor post (mentors only)
router.post('/mentors/posts/create', authMiddleware, verifyMentor, async (req, res) => {
    try {
        console.log("Inside create mentor post route");

        const { mentorName, mentorField, mentorBackground, title, content } = req.body;
        const job = new Job({
            mentorName,
            mentorField,
            mentorBackground,
            title,
            content,
            postedBy: req.user.userId
        });

        await job.save();
        console.log("Mentor post saved!");

        return res.status(201).json({ message: 'Mentor post created successfully', job });

    } catch (error) {
        console.error("Create mentor post error:", error);
        return res.status(500).json({ message: 'Server error while creating post', error });
    }
});


// Simulated test endpoint
router.get('/mentors/simulated', (req, res) => {
    res.json([
        {
            mentorName: "Dr. Leen",
            mentorField: "Computer Science",
            mentorBackground: "PhD in AI, 10 years experience",
            title: "Why AI is the Future",
            content: "Artificial Intelligence is reshaping industries...",
            createdAt: new Date()
        }
    ]);
});


router.get('/ping', (req, res) => {
    res.send('jobRoutes working!');
  });
module.exports = router;  
