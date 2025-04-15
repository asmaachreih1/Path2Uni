console.log("Hostname:", window.location.hostname);

let API_BASE_URL = '';

// Check if the app is running on localhost
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    API_BASE_URL = 'http://localhost:5001';  // Local development server
} else {
    API_BASE_URL = 'https://path2uni.onrender.com';  // Production server
}

console.log("API Base URL:", API_BASE_URL);


document.getElementById("forgot-password-form").addEventListener("submit", async function (event) {
    event.preventDefault();

    let email = document.getElementById("email").value;
    let messageBox = document.getElementById("message");

    if (!validateEmail(email)) {
        messageBox.style.color = "red";
        messageBox.textContent = "Please enter a valid email address";
        return;
    }

    try {
         console.log("Sending password reset request for:", email);//new
        const response = await fetch(`${API_BASE_URL}/api/forgot-password`, {  // Ensure backend is running
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email: email })
        });

        const data = await response.json();
        if (response.ok) {
            messageBox.style.color = "green";
            messageBox.textContent = "✅ Reset link sent! Check your email.";
        } else {
            console.error("❌ Server responded with:", data); // Debugging newww
            messageBox.style.color = "red";
            messageBox.textContent = "❌ " + data.message;
        }
    } catch (error) {
        console.error("❌ Network error:", error);//newwwwww
        messageBox.style.color = "red";
        messageBox.textContent = "❌ Something went wrong. Try again.";
    }
});

function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
