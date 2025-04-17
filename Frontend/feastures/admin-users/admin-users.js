



const API_ENDPOINTS = {
    //getUsers: `${API_BASE_URL}/users`,
    getUsers: `${API_BASE_URL}/api/admin/users`,
    deleteUser: `${API_BASE_URL}/api/admin/users/delete`, // Assuming this endpoint exists
};

const usersContainer = document.getElementById('usersContainer');
const token = localStorage.getItem('token');

// Initialize the admin page
document.addEventListener('DOMContentLoaded', async function() {
    try {
        await loadUsers();
    } catch (error) {
        console.error('Admin init error:', error);
        showError('Failed to load admin content.');
    }
});


// Load mentor posts
async function loadUsers() {
    try {
        const response = await fetch(API_ENDPOINTS.getUsers, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (!response.ok) throw new Error('Failed to fetch posts');
        const users = await response.json();
        console.log("Admin fetched users:", users);
        
        
        // Filter out admins
        const nonAdminUsers = users.filter(user => !user.isAdmin);
        renderUsers(nonAdminUsers);
    } catch (error) {
        console.error('Error loading users:', error);
        showError('Could not load users.');
    }
}






// Render users with delete button
function renderUsers(users) {
    usersContainer.innerHTML = ''; // Clear previous content

    if (!users || users.length === 0) {
        usersContainer.innerHTML = `
            <div class="no-results">
                <i class="fas fa-info-circle"></i>
                <p>No users available.</p>
            </div>
        `;
        return;
    }

    users.forEach(user => {
        const userElement = document.createElement('div');
        userElement.className = 'mentor-post'; // Keeping class name for consistent style
        userElement.innerHTML = `
            <div class="post-header">
                <div class="post-author">
                    <h4>${user.username}</h4>
                    <p>${user.role} - ${user.grade}</p>
                </div>
            </div>
            <div class="post-content">
                <p><strong>Email:</strong> ${user.email}</p>
                <p><strong>User ID:</strong> ${user._id}</p>
            </div>
            <button class="delete-btn" data-id="${user._id}" title="Delete this user">
                <i class="fas fa-trash-alt"></i> Delete
            </button>
        `;

        userElement.querySelector('.delete-btn').addEventListener('click', () => handleDeleteUser(user._id));
        usersContainer.appendChild(userElement);
    });
}



// Delete a user by ID
async function handleDeleteUser(userId) {
    if (!confirm('Are you sure you want to delete this user?')) return;

    try {
        const response = await fetch(`${API_ENDPOINTS.deleteUser}/${userId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) throw new Error('Failed to delete user');

        // Reload users
        await loadUsers();
    } catch (error) {
        console.error('Error deleting user:', error);
        showError('Failed to delete the user.');
    }
}


// Show error message
function showError(message) {
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.innerHTML = `
        <i class="fas fa-exclamation-triangle"></i>
        <p>${message}</p>
    `;
    usersContainer.insertBefore(errorElement, usersContainer.firstChild);
    setTimeout(() => errorElement.remove(), 5000);
}



