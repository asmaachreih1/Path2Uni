const API_BASE_URL = 'https://path2uni.onrender.com';

const loginForm = document.getElementById('loginForm');

function validateForm() {
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Accepts any email format

    if (!emailRegex.test(email)) {
        alert('Please enter a valid Gmail address (e.g., example@gmail.com).');
        return false; 
    }

    if (password.length < 8) {
        alert('Password must be at least 8 characters long.');
        return false;
    }

    return true;
}

loginForm.addEventListener('submit', async function (event) {
    event.preventDefault(); // Prevent the default form submission

    if (!validateForm()) {
        return; // Stop if validation fails
    }

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    console.log("Attempting to log in with:", email, password); // Debugging lleen

    try {
        // Make a POST request to your backend for authentication
        const response = await fetch(`${API_BASE_URL}/api/signin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });
        console.log("🛠 Response received:", response); // Debugging leen

        if (response.ok) {
            /*
            OLD, working for login but not for logout

            // If login is successful, redirect to the landing page
            window.location.href = '../landing-page/landing-page.html';
            */

            // NEW, for LOGOUT

            const data = await response.json(); // Parse the JSON response
            console.log("Login Response Data:", data); // Debugging

            // Save the token to Local Storage
            localStorage.setItem('token', data.token);

            // Redirect to the landing page
            window.location.href = '../landing-page/landing-page.html';

            // NEW - end
        } else {
            // Handle failed login (e.g., wrong credentials)
            alert('Invalid email or password. Please try again.');
        }
    } catch (error) {
        console.error('Error logging in:', error);
        alert('An error occurred while logging in. Please try again later.');
    }
});

function togglePassword() {
    const passwordField = document.getElementById('password');
    const toggleIcon = document.querySelector('.toggle-password i');

    // Toggle the input type between password and text
    if (passwordField.type === 'password') {
        passwordField.type = 'text';
        toggleIcon.classList.remove('fa-eye');
        toggleIcon.classList.add('fa-eye-slash'); // Change icon to "eye-slash" (hide password)
    } else {
        passwordField.type = 'password';
        toggleIcon.classList.remove('fa-eye-slash');
        toggleIcon.classList.add('fa-eye'); // Change icon back to "eye" (show password)
    }
}

