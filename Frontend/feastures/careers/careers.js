
let API_BASE_URL = ''; // Declare the variable

// Check if the app is running on localhost
if (window.location.hostname === 'localhost') {
    API_BASE_URL = 'http://localhost:5001';  // Local development server
} else {
    API_BASE_URL = 'https://path2uni.onrender.com';  // Production server
}

console.log("API Base URL:", API_BASE_URL);

// API Endpoints (replace with your actual backend endpoints)
const API_ENDPOINTS = {
    getUserRole: `${API_BASE_URL}/api/user/role`,
    getMentorPosts: `${API_BASE_URL}/jobs/mentors/posts`,
    createMentorPost: `${API_BASE_URL}/jobs/mentors/posts/create`
};

// DOM Elements
const insightsContainer = document.getElementById('insightsContainer');
const postFormContainer = document.getElementById('postFormContainer');
console.log("postFormContainer found?", postFormContainer);
// 🔧 Get token from localStorage
const token = localStorage.getItem('token'); // 🔧 Added to use JWT token

// Initialize the page
document.addEventListener('DOMContentLoaded', async function() {
    try {
        // 1. Get current user role
        const role = await fetchUserRole();
       //const role = 'Mentor';
        // 2. Set up mentor insights section
        if (role === 'Mentor') {
            postFormContainer.style.display = 'block';
            document.getElementById('mentorPostForm').addEventListener('submit', handlePostSubmit);
            console.log("✅ Forced post form visible (DEV MODE)");
        } else {
            postFormContainer.style.display = 'none';
        }
        
        // 3. Load mentor posts
        await loadMentorPosts();
        
    } catch (error) {
        console.error('Initialization error:', error);
        showError('Failed to load page content. Please try again later.');
    }
});

// Fetch user role from backend
async function fetchUserRole() {
try {   
    const token = localStorage.getItem('token'); // ✅ Get token from localStorage
    console.log("Fetching user role with token:", token);

        const response = await fetch(API_ENDPOINTS.getUserRole, {
           

            //method: 'GET',
            headers: { // 🔧 Modified to include token
                'Authorization': `Bearer ${token}` // 🔧 Add token here
            }

        });
        
        if (!response.ok) throw new Error('Failed to fetch user role');
        const data = await response.json();
        console.log("Fetched user role:", data.role); // ✅ Log it
        return data.role;
    } catch (error) {
        console.error('Error fetching user role:', error);
        return 'Student'; // Default to student view
    }
}

// Load mentor posts from backend
async function loadMentorPosts() {
    try {
        const response = await fetch(API_ENDPOINTS.getMentorPosts);
        
        if (!response.ok) throw new Error('Failed to fetch mentor posts');
        const responseData = await response.json();
        const posts = responseData.posts || responseData; // support both styles neww
        console.log("Fetched mentor posts:", posts); // ✅neww
        renderMentorPosts(posts);

    } catch (error) {
        console.error('Error loading mentor posts:', error);
        showError('Failed to load mentor insights. Please refresh the page.');

        // Ensure spinner is removed even if the request fails
    const loadingSpinner = insightsContainer.querySelector('.loading-spinner');
    if (loadingSpinner) loadingSpinner.remove();
    }
}

// Render mentor posts to the page
function renderMentorPosts(posts) {
    // Clear loading spinner
    const loadingSpinner = insightsContainer.querySelector('.loading-spinner');
    if (loadingSpinner) loadingSpinner.remove();

    // Clear existing posts (keep form if present)
    const existingPosts = insightsContainer.querySelectorAll('.mentor-post');
    existingPosts.forEach(post => post.remove());
   // insightsContainer.innerHTML = ''; // ✅ clears all old/static posts


    if (!posts || posts.length === 0) {
        insightsContainer.innerHTML += `
            <div class="no-results">
                <i class="fas fa-info-circle"></i>
                <p>No mentor insights available yet.</p>
            </div>
        `;
        return;
    }

    posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.className = 'mentor-post';
        postElement.innerHTML = `
            <div class="post-header">
                <div class="post-author">
                    <h4>${post.mentorName}</h4>
                    <p>${post.mentorField} - ${post.mentorBackground}</p>
                </div>
            </div>
            <h3 class="post-title">${post.title}</h3>
            <div class="post-content">
                ${post.content.replace(/\n/g, '<br>')}
            </div>
            <div class="post-date">Posted on ${formatDate(post.createdAt)}</div>
        `;
        
        insightsContainer.appendChild(postElement);
    });
}

// Handle form submission for new mentor posts
async function handlePostSubmit(e) {
    e.preventDefault();
    
    const mentorName = document.getElementById('mentorName').value.trim();
    const mentorField = document.getElementById('mentorField').value.trim();
    const mentorBackground = document.getElementById('mentorBackground').value.trim();
    const title = document.getElementById('postTitle').value.trim();
    const content = document.getElementById('postContent').value.trim();
    
    if (!mentorName || !mentorField || !mentorBackground || !title || !content) {
        showError('Please fill in all fields');
        return;
    }
 // ✅ Retrieve token from localStorage
 /*const token = localStorage.getItem('token'); 
 if (!token) {
     showError('You are not authorized to post. Please sign in as a mentor.');
     return;
 }
 console.log("📦 Submitting post with token:", localStorage.getItem('token'));*/
 const token = localStorage.getItem('token'); // 🔑 Make sure to get it here in case it was null earlier
console.log("📦 Submitting post with token:", token); // ✅ Keep for debugging
    try {
        
    const response = await fetch(API_ENDPOINTS.createMentorPost, {
        
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}` // ✅ attach token from login

            },
           // credentials: 'include',
            body: JSON.stringify({ 
                mentorName,
                mentorField, 
                mentorBackground,
                title, 
                content 
            })
        });

        if (!response.ok) throw new Error('Failed to create post');

        // Clear form and reload posts
        e.target.reset();
        await loadMentorPosts();
        
    } catch (error) {
        console.error('Error creating post:', error);
        showError('Failed to create post. Please try again.');
    }
}

// Helper function to format date
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
}

// Helper function to show error messages
function showError(message) {
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.innerHTML = `
        <i class="fas fa-exclamation-triangle"></i>
        <p>${message}</p>
    `;
    
    // Add to the top of insights container
    insightsContainer.insertBefore(errorElement, insightsContainer.firstChild);
    
    // Remove after 5 seconds
    setTimeout(() => errorElement.remove(), 5000);
}

// Add hover effects to career boxes
document.querySelectorAll('.career-box').forEach(box => {
    box.addEventListener('click', () => {
        box.style.transform = 'translateY(-5px)';
        setTimeout(() => box.style.transform = 'translateY(0)', 200);
    });
});


