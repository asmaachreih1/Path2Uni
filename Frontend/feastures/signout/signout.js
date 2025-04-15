
let API_BASE_URL = ''; // Declare the variable

// Check if the app is running on localhost
if (window.location.hostname === 'localhost') {
    API_BASE_URL = 'http://localhost:5001';  // Local development server
} else {
    API_BASE_URL = 'https://path2uni.onrender.com';  // Production server
}

console.log("API Base URL:", API_BASE_URL);

document.addEventListener('DOMContentLoaded', () => {

    const signOutButton = document.getElementById("signOutBtn");

    if (signOutButton != null) {

        signOutButton.addEventListener('click', async (event) => {

            // Prevent the default link behavior
            event.preventDefault(); 
    
            try {
                // Send a POST request to the logout endpoint
                const response = await fetch(`${API_BASE_URL}/api/logout`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`, // Include the JWT token
                        'Content-Type': 'application/json'
                    }
                });
    
                if (response.ok) {
                    // Remove the token from local storage
                    localStorage.removeItem('token');
    
                    // Redirect to the login page (or home page)
                    window.location.href = '../../index.html'; 
                } else {
                    alert('Logout failed. Please try again.');
                }
            } catch (error) {
                console.error('Error logging out:', error);
                alert('An error occurred while logging out. Please try again later.');
            }
        });

    }
});

const cancelButton = document.getElementById("cancelBtn");

if (cancelButton != null) {

    cancelButton.addEventListener("click", () => {
        window.location.href = "../landing-page/landing-page.html"; 
    });
    
}
