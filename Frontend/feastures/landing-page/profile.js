
console.log("Hostname:", window.location.hostname);

let API_BASE_URL = '';

// Check if the app is running on localhost
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    API_BASE_URL = 'http://localhost:5001';  // Local development server
} else {
    API_BASE_URL = 'https://path2uni.onrender.com';  // Production server
}

console.log("API Base URL:", API_BASE_URL);


// JavaScript to handle the role-based logic
window.onload = function() {
    const roleElement = document.getElementById("profile-role");
    const gradeElement = document.getElementById("profile-grade");

    // Get the role (In real scenario, this could be dynamic from a database)
    const role = roleElement.innerText.trim(); // Trim to remove any extra spaces

    // Show or hide grade based on role
    if (role === "Student") {
        gradeElement.style.display = "block"; // Show grade
    } else {
        gradeElement.style.display = "none"; // Hide grade
    }
};


document.addEventListener("DOMContentLoaded", async function () {
    try {
        const token = localStorage.getItem("token"); // Ensure user is authenticated
        if (!token) {
            console.error("No auth token found.");
            return;
        }

        const response = await fetch(`${API_BASE_URL}/api/profile`, {  // Updated port
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });

        const data = await response.json();
        if (response.ok) {
            const user = data.user;
            document.getElementById("profile-name").innerText = user.username;
            document.getElementById("profile-email").innerText = user.email;
            document.getElementById("profile-role").innerText = user.role;

            const gradeContainer = document.getElementById("profile-grade");
            const gradeValue = document.getElementById("profile-grade-value");

            if (user.role === "Student") {
                gradeContainer.style.display = "block";
                gradeValue.innerText = user.grade || "N/A";
            } else {
                gradeContainer.style.display = "none";
            }
        } else {
            console.error("Error fetching profile:", data.message);
        }
    } catch (error) {
        console.error("Unexpected error:", error);
    }
});
