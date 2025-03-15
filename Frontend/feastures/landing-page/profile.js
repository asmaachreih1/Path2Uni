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
