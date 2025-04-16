



const API_ENDPOINTS = {
    getMentorPosts: `${API_BASE_URL}/jobs/mentors/posts`,
   // deleteMentorPost: `${API_BASE_URL}/jobs/mentors/posts/delete`, // Assuming this endpoint exists
   deleteMentorPost: `${API_BASE_URL}/jobs/admin/mentors/posts/delete`

};

const insightsContainer = document.getElementById('insightsContainer');
const token = localStorage.getItem('token');

// Initialize the admin page
document.addEventListener('DOMContentLoaded', async function() {
    try {
        await loadMentorPosts();
    } catch (error) {
        console.error('Admin init error:', error);
        showError('Failed to load admin content.');
    }
});

// Load mentor posts
async function loadMentorPosts() {
    try {
        const response = await fetch(API_ENDPOINTS.getMentorPosts);
        if (!response.ok) throw new Error('Failed to fetch posts');
        const responseData = await response.json();
        const posts = responseData.posts || responseData;
        console.log("Admin fetched posts:", posts);
        renderMentorPosts(posts);
    } catch (error) {
        console.error('Error loading mentor posts:', error);
        showError('Could not load mentor posts.');
    }
}

// Render posts with delete button for each
function renderMentorPosts(posts) {
    insightsContainer.innerHTML = ''; // Clear previous content

    if (!posts || posts.length === 0) {
        insightsContainer.innerHTML = `
            <div class="no-results">
                <i class="fas fa-info-circle"></i>
                <p>No mentor insights available.</p>
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
            <div class="post-content">${post.content.replace(/\n/g, '<br>')}</div>
            <div class="post-date">Posted on ${formatDate(post.createdAt)}</div>
            <button class="delete-btn" data-id="${post._id}" title="Delete this post">
  <i class="fas fa-trash-alt"></i> Delete
</button>

        `;

        // Attach delete handler
        postElement.querySelector('.delete-btn').addEventListener('click', () => handleDeletePost(post._id));
        insightsContainer.appendChild(postElement);
    });
}

// Delete a post by ID
async function handleDeletePost(postId) {
    if (!confirm('Are you sure you want to delete this post?')) return;

    try {
        const response = await fetch(`${API_ENDPOINTS.deleteMentorPost}/${postId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) throw new Error('Failed to delete post');

        // Refresh posts after deletion
        await loadMentorPosts();
    } catch (error) {
        console.error('Error deleting post:', error);
        showError('Failed to delete the post.');
    }
}

// Format date nicely
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
}

// Show error message
function showError(message) {
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.innerHTML = `
        <i class="fas fa-exclamation-triangle"></i>
        <p>${message}</p>
    `;
    insightsContainer.insertBefore(errorElement, insightsContainer.firstChild);
    setTimeout(() => errorElement.remove(), 5000);
}


