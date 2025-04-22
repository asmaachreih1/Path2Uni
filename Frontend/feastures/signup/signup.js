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
// Handle form submission
document.querySelector(".signup-form").addEventListener("submit", async function (e) {
    e.preventDefault();

    const username = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm-password").value;

    // Simple validation
    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    const userData = {
        username,
        email,
        password,
        role: "Student",  // Default role
        grade: "12"       // Default grade
    };

    try {
       const response = await fetch(`${API_BASE_URL}/api/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username, email, password })

        });

        const result = await response.json();

        if (response.ok) {
            alert("Sign-up successful!");
            window.location.href = "../login/login.html"; // Redirect to login page
        } else {
            alert(result.message || "Sign-up failed. Please try again.");
        }
    } catch (error) {
        console.error("Error:", error);
        alert("An error occurred. Please try again later.");
    }
});
