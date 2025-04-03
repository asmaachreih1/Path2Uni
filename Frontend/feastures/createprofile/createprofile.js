document.addEventListener("DOMContentLoaded", function() {
    loadProfile();

    const fileInput = document.getElementById("file-input");
    fileInput.addEventListener("change", changeProfilePic);
    document.getElementById("role").addEventListener("change", toggleGradeSelection);
    document.getElementById("submit-btn").addEventListener("click", submitProfile);
});

function toggleGradeSelection() {
    const gradeSelect = document.getElementById("grade");
    gradeSelect.classList.toggle("hidden", document.getElementById("role").value !== "student");
    gradeSelect.required = document.getElementById("role").value === "student";
}

function changeProfilePic(event) {
    const file = event.target.files[0];
    if (!file) return;

    if (!file.type.match('image.*')) {
        alert("Please select an image file");
        return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
        document.getElementById("profile-img").src = e.target.result;
        localStorage.setItem("profilePic", e.target.result);
    };
    reader.readAsDataURL(file);
}

function submitProfile() {
    const role = document.getElementById("role").value;
    const grade = document.getElementById("grade").value;

    if (!role) {
        alert("Please select your role");
        return;
    }

    if (role === "student" && !grade) {
        alert("Please select your grade");
        return;
    }

    const profileData = { 
        role, 
        grade: role === "student" ? grade : null 
    };
    localStorage.setItem("profileData", JSON.stringify(profileData));

    alert("Profile Created Successfully!");
    // Here you would typically redirect to another page
    // window.location.href = "dashboard.html";
}

function loadProfile() {
    const storedProfile = JSON.parse(localStorage.getItem("profileData"));
    if (storedProfile) {
        document.getElementById("role").value = storedProfile.role;
        toggleGradeSelection();
        if (storedProfile.role === "student") {
            document.getElementById("grade").value = storedProfile.grade;
        }
    }

    const storedImage = localStorage.getItem("profilePic");
    if (storedImage) {
        document.getElementById("profile-img").src = storedImage;
    }
}


