document.addEventListener("DOMContentLoaded", function() {
    loadProfile();
    
    // Make the profile picture container clickable
    const profilePicContainer = document.querySelector(".profile-pic-container");
    
    // Only trigger the file input when the pencil icon is clicked
    const editIcon = document.querySelector(".edit-icon");
    editIcon.addEventListener("click", function() {
        document.getElementById("profilePic").click();
    });
});

function toggleGradeSelection() {
    const role = document.getElementById("role").value;
    const gradeDropdown = document.getElementById("grade");

    if (role === "student") {
        gradeDropdown.classList.remove("hidden");
    } else {
        gradeDropdown.classList.add("hidden");
    }
}

function previewImage() {
    const fileInput = document.getElementById("profilePic");
    const preview = document.getElementById("preview");

    if (fileInput.files && fileInput.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            preview.src = e.target.result;
            preview.classList.remove("hidden");

            // Save image to local storage
            localStorage.setItem("profilePic", e.target.result);

            // Show the remove button after the profile picture is set
            document.getElementById("removePicButton").classList.remove("hidden");
        };
        reader.readAsDataURL(fileInput.files[0]);
    }
}

function removeProfilePic() {
    // Set the profile picture back to the default one
    const preview = document.getElementById("preview");
    preview.src = "profile-def.jpg";  // Default image path
    preview.classList.remove("hidden");

    // Remove the saved profile picture from local storage
    localStorage.removeItem("profilePic");

    // Hide the remove button after the picture is removed
    document.getElementById("removePicButton").classList.add("hidden");
}

function submitProfile() {
    const username = document.getElementById("username").value.trim();
    const role = document.getElementById("role").value;
    const grade = document.getElementById("grade").value;
    const profilePic = document.getElementById("profilePic").files[0];

    if (!username || !role) {
        alert("Please fill in all required fields.");
        return;
    }

    if (role === "student" && !grade) {
        alert("Please select your grade.");
        return;
    }

    // Save profile data to local storage
    const profileData = {
        username,
        role,
        grade: role === "student" ? grade : "N/A",
    };

    localStorage.setItem("profileData", JSON.stringify(profileData));

    alert("Profile Created Successfully!");

    // Optionally redirect to another page
    // window.location.href = "dashboard.html";
}

function loadProfile() {
    const storedProfile = localStorage.getItem("profileData");
    const storedImage = localStorage.getItem("profilePic");

    if (storedProfile) {
        const profile = JSON.parse(storedProfile);

        document.getElementById("username").value = profile.username;
        document.getElementById("firstname").value = profile.firstname;
        document.getElementById("lastname").value = profile.lastname;
        document.getElementById("role").value = profile.role;
        toggleGradeSelection();

        if (profile.role === "student") {
            document.getElementById("grade").value = profile.grade;
        }
    }

    // Set a default profile picture if none exists in local storage
    const preview = document.getElementById("preview");

    if (storedImage) {
        preview.src = storedImage;
        preview.classList.remove("hidden");

        // Show the remove button if there is a custom profile picture
        document.getElementById("removePicButton").classList.remove("hidden");
    } else {
        preview.src = "profile-def.jpg";  // Default image path
        preview.classList.remove("hidden");

        // Hide the remove button if there is no custom picture
        document.getElementById("removePicButton").classList.add("hidden");
    }
}
