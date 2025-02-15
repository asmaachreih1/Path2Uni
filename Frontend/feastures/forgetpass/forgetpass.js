document.getElementById("forgot-password-form").addEventListener("submit", function(event) {
    event.preventDefault();

    let email = document.getElementById("email").value;
    let messageBox = document.getElementById("message");

    if (!validateEmail(email)) {
        messageBox.style.color = "red";
        messageBox.textContent = "Please enter a valid email address";
        return;
    }

    // Simulating API request (Replace with actual API call)
    fetch("https://your-api-endpoint.com/forgot-password", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email: email })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            messageBox.style.color = "green";
            messageBox.textContent = "Reset link sent! Check your email.";
        } else {
            messageBox.style.color = "red";
            messageBox.textContent = "Error: " + data.message;
        }
    })
    .catch(error => {
        messageBox.style.color = "red";
        messageBox.textContent = "Something went wrong. Please try again later.";
    });
});

// Function to validate email format
function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
