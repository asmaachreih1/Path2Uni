document.addEventListener("DOMContentLoaded", function () {
    // Get the token from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token"); 

    if (!token) {
        alert("Invalid or missing token.");
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
            alert("Password must be at least 8 characters long.");
            return;
        }

        // Check if passwords match
        if (newPassword !== confirmPassword) {
            alert("Passwords do not match.");
            return;
        }

        try {
            // Send password update request to backend
            const response = await fetch(`http://localhost:5001/api/reset-password/${token}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ newPassword }),
            });

            const data = await response.json();

            if (response.ok) {
                alert("Password reset successfully! You can now sign in.");
                window.location.href = "../login/login.html"; // Redirect after reset
            } else {
                alert(`Error: ${data.message}`);
            }
        } catch (error) {
            console.error("Reset password error:", error);
            alert("Something went wrong. Try again.");
        }
    });
});
