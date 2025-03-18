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
        const response = await fetch("http://localhost:5001/api/forgot-password", {  // Ensure backend is running
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
