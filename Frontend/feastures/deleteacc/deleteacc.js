
console.log("Hostname:", window.location.hostname);

let API_BASE_URL = '';

// Check if the app is running on localhost
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    API_BASE_URL = 'http://localhost:5001';  // Local development server
} else {
    API_BASE_URL = 'https://path2uni.onrender.com';  // Production server
}

console.log("API Base URL:", API_BASE_URL);


document.addEventListener('DOMContentLoaded', () => {

    const deleteAccountButton = document.getElementById("deleteAccountBtn");

    deleteAccountButton.addEventListener('click', async (event) => {
        event.preventDefault(); // Prevent default behavior

        const confirmation = confirm("Are you sure you want to delete your account? This action cannot be undone."); 
        if (!confirmation) return;

        try {
            // Send a DELETE request to the backend
            const response = await fetch(`${API_BASE_URL}/api/delete-account`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`, // Include JWT token
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                // Remove token from local storage
                localStorage.removeItem('token');

                alert("Your account has been deleted successfully.");
                window.location.href = '../../index.html'; // Redirect to homepage or login page
            } else {
                alert("Failed to delete account. Please try again.");
            }
        } catch (error) {
            console.error("Error deleting account:", error);
            alert("An error occurred. Please try again later.");
        }
    });

    // Cancel button functionality
    document.getElementById("cancelBtn").addEventListener("click", () => {
        window.location.href = "../landing-page/landing-page.html"; 
    }); 
});
