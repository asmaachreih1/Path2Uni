
document.addEventListener('DOMContentLoaded', () => {

    const signOutButton = document.querySelector('a[href="#"]');

    signOutButton.addEventListener('click', async (event) => {

        // Prevent the default link behavior
        event.preventDefault(); 

        try {
            // Send a POST request to the logout endpoint
            const response = await fetch('http://localhost:5001/api/logout', {
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
});

