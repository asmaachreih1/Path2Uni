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
        const response = await fetch('http://localhost:5001/api/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });
        console.log("🛠 Response received:", response); // Debugging leen

        if (response.ok) {
            // If login is successful, redirect to the landing page
            window.location.href = '../landing-page/landing-page.html';
        } else {
            // Handle failed login (e.g., wrong credentials)
            alert('Invalid email or password. Please try again.');
        }
    } catch (error) {
        console.error('Error logging in:', error);
        const errorData = await response.json();
        alert(`Error: ${errorData.message}`);
        console.error("Backend Error:", errorData);
    }
});
