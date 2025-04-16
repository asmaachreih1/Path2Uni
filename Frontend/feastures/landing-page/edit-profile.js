


document.addEventListener("DOMContentLoaded", function () {
    // Function to make a field editable when clicked
    function makeEditable(elementId) {
        const span = document.getElementById(elementId);
        span.addEventListener("click", function () {
            const currentValue = span.textContent;
            const input = document.createElement("input");
            input.type = "text";
            input.value = currentValue;
            input.classList.add("edit-input");

            span.replaceWith(input);
            input.focus();

            function saveChanges() {
                const newValue = input.value.trim() || currentValue;
                span.textContent = newValue;
                input.replaceWith(span);
            }

            input.addEventListener("blur", saveChanges);
            input.addEventListener("keypress", function (event) {
                if (event.key === "Enter") {
                    saveChanges();
                }
            });
        });
    }

    // Make only specific fields editable
    makeEditable("profile-name");
    makeEditable("profile-first");
    makeEditable("profile-last");

    // Role and email should not be editable
    const roleSpan = document.getElementById("profile-role");
    const emailSpan = document.getElementById("profile-email");
    roleSpan.style.cursor = "not-allowed";
    emailSpan.style.cursor = "not-allowed";

    // Handle grade field visibility based on role
    const gradeContainer = document.getElementById("profile-grade");
    const gradeSpan = document.getElementById("profile-grade-value");

    if (roleSpan.textContent.trim() === "Student") {
        gradeContainer.style.display = "block";
        makeEditable("profile-grade-value");
    } else {
        gradeContainer.style.display = "none";
    }

    // Profile picture change functionality
    const profileImg = document.getElementById("profile-img");
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";
    fileInput.style.display = "none"; // Hide file input

    profileImg.addEventListener("click", function () {
        fileInput.click(); // Trigger file input when image is clicked
    });

    fileInput.addEventListener("change", function () {
        if (fileInput.files && fileInput.files[0]) {
            const reader = new FileReader();
            reader.onload = function (e) {
                profileImg.src = e.target.result; // Update image source
            };
            reader.readAsDataURL(fileInput.files[0]);
        }
    });

    document.body.appendChild(fileInput); // Append file input to body
});



document.addEventListener("DOMContentLoaded", async function () {

    // Load current profile data
    try {

        
    
        
    const loading = document.getElementById("loading");
    const profileContainer = document.getElementById("profile-container");

    

        const token = localStorage.getItem("token");
        if (!token) {
            window.location.href = "login.html";
            return;
        }

        // Fetch current profile data
        const response = await fetch(`${API_BASE_URL}/api/profile`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error("Failed to fetch profile");
        }

        const data = await response.json();
        const user = data.user;

        // Populate form fields
        document.getElementById("profile-name").textContent = user.username;
        document.getElementById("profile-email").textContent = user.email;
        
        const roleSelect = document.getElementById("profile-role-select");
        roleSelect.value = user.role;
        
        const gradeSelect = document.getElementById("profile-grade-select");
        gradeSelect.value = user.grade || "N/A";

        // Show/hide grade based on role
        function toggleGradeVisibility() {
            document.querySelector(".profile-grade").style.display = 
                roleSelect.value === "Student" ? "block" : "none";
        }
        
        roleSelect.addEventListener("change", toggleGradeVisibility);
        toggleGradeVisibility(); // Initial check




            
    // Hide loader, show content
    loading.style.display = "none";
    profileContainer.style.display = "flex";




    } catch (error) {
        console.error("Error loading profile:", error);
        alert("Failed to load profile data");
        profileContainer.style.display = "none";
    }

    // Save functionality
    document.getElementById("save-btn").addEventListener("click", async function() {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                window.location.href = "login.html";
                return;
            }

            const updatedData = {
                username: document.getElementById("profile-name").textContent,
                role: document.getElementById("profile-role-select").value,
                grade: document.getElementById("profile-role-select").value === "Student" 
                    ? document.getElementById("profile-grade-select").value 
                    : undefined
            };

            const response = await fetch(`${API_BASE_URL}/api/edit-profile`, {
                method: "PUT",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(updatedData)
            });

            if (response.ok) {
                alert("Profile updated successfully!");
                window.location.href = "profile.html"; // Redirect to profile page
            } else {
                const errorData = await response.json();
                throw new Error(errorData.message || "Failed to update profile");
            }
        } catch (error) {
            console.error("Error updating profile:", error);
            alert(error.message);
        }
    });

    // Make name editable (similar to your existing implementation)
    const profileName = document.getElementById("profile-name");
    profileName.addEventListener("click", function() {
        if (this.getAttribute("data-editable") === "false") {
            const currentValue = this.textContent;
            const input = document.createElement("input");
            input.type = "text";
            input.value = currentValue;
            input.classList.add("edit-input");

            this.replaceWith(input);
            input.focus();

            const saveChanges = () => {
                const newValue = input.value.trim() || currentValue;
                this.textContent = newValue;
                input.replaceWith(this);
            };

            input.addEventListener("blur", saveChanges);
            input.addEventListener("keypress", function(e) {
                if (e.key === "Enter") saveChanges();
            });
        }
    });
});
