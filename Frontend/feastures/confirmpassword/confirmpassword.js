
console.log("Hostname:", window.location.hostname);

let API_BASE_URL = '';

// Check if the app is running on localhost
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    API_BASE_URL = 'http://localhost:5001';  // Local development server
} else {
    API_BASE_URL = 'https://path2uni.onrender.com';  // Production server
}

console.log("API Base URL:", API_BASE_URL);

document.addEventListener("DOMContentLoaded", function () {
    // Get the token from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token"); 

    if (!token) {
        alert("❌Invalid or missing token.");
        window.location.href = "../login/login.html"; // Redirect to login if token is missing
        return;
    }

    const confirmPassForm = document.getElementById("reset-password-form");

    confirmPassForm.addEventListener("submit", async function (event) {
        event.preventDefault(); // Prevent form from reloading the page

        const newPassword = document.getElementById("new-password").value.trim();
        const confirmPassword = document.getElementById("confirm-password").value.trim();

        // Validate password length
        if (newPassword.length < 8) {
            alert("⚠️Password must be at least 8 characters long.");
            return;
        }

        // Check if passwords match
        if (newPassword !== confirmPassword) {
            alert("❌Passwords do not match.");
            return;
        }

        try {
            // Send password update request to backend
            console.log("🔹 Sending password reset request to backend..."); // Debugging
            const response = await fetch(`${API_BASE_URL}/api/reset-password/${token}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ newPassword }),
            });

            const data = await response.json();
            console.log("🔹 Backend Response:", data); // Debugging
            
            if (response.ok) {
                alert("✅ Password reset successfully! You can now sign in.");
                window.location.href = "../login/login.html"; // Redirect after reset
            } else {
                alert(`❌Error: ${data.message}`);
            }
        } catch (error) {
            console.error("❌Reset password error:", error);
            alert("❌Something went wrong. Try again.");
        }
    });
});
