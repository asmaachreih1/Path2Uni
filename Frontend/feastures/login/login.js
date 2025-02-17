const loginForm = document.getElementById('loginForm');

function validateForm() {

    /*
     NO NEED for email format validation, because of using "email" type in html file
     (so it's optional here in js)

    const email = document.getElementById('email').value.trim();
    
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address (e.g., example@gmail.com).');
        return false; 
    }
    */

    /*
    PASSWORD FORMAT: at least 8 characters, that include
    at least one letter (uppercase or lowercase),
    at least one special character
    */
    const password = document.getElementById('password').value.trim();

    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^&*\.\+\-])[a-zA-Z0-9!@#$%^&*\.\+\-]{8,}$/;

    if (!passwordRegex.test(password)) {
        alert('Password must be at least 8 characters long, contain at least one letter, and one special character (including .).');
        return false;
    }
    
    /*
    password format: only restriction 8 characters min:
    const password = document.getElementById('password').value.trim();
    if (password.length < 8) {
        alert('Password must be at least 8 characters long.');
        return false;
    }
    */

    return true;

}

loginForm.addEventListener('submit', async function (event) {
    event.preventDefault(); // Prevent the default form submission

    if (!validateForm()) {
        return; // Stop if validation fails
    }

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    try {
        // Make a POST request to your backend for authentication
        const response = await fetch('http://localhost:5001/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        if (response.ok) {
            // If login is successful, redirect to the landing page
            window.location.href = '../landing-page/landing-page.html';
        } else {
            // Handle failed login (e.g., wrong credentials)
            alert('Invalid email or password. Please try again.');
        }
    } catch (error) {
        console.error('Error logging in:', error);
        alert('An error occurred while logging in. Please try again later.');
    }
});
