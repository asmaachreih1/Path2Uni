const loginForm = document.getElementById('loginForm');

function validateForm() {
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    const emailRegex = /^[^\s@]+@gmail\.com$/;
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

loginForm.addEventListener('submit', function (event) {
    if (!validateForm()) {
        event.preventDefault();
    }
});