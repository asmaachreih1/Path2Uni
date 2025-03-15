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
