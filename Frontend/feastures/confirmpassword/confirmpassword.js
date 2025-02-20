const confirmPassForm = document.getElementById('confirmPassForm');

function validatePasswords() {
    const newPassword = document.getElementById('newPassword').value.trim();
    const confirmPassword = document.getElementById('confirmPassword').value.trim();

    if (newPassword.length < 8) {
        alert('Password must be at least 8 characters long.');
        return false;
    }

    if (newPassword !== confirmPassword) {
        alert('Passwords do not match. Please try again.');
        return false;
    }

    return true;
}

confirmPassForm.addEventListener('submit', async function (event) {
    event.preventDefault(); // Prevent default form submission

    if (!validatePasswords()) {
        return; // Stop if validation fails
    }

    const newPassword = document.getElementById('newPassword').value.trim();

    try {
        // Send password update request to the backend
        const response = await fetch('http://localhost:5001/api/reset-password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ newPassword }),
        });

        if (response.ok) {
            alert('Password updated successfully. You can now sign in.');
            window.location.href = '../signin/login.html';
        } else {
            alert('Failed to update password. Please try again.');
        }
    } catch (error) {
        console.error('Error resetting password:', error);
        alert('An error occurred while resetting the password. Please try again later.');
    }
});

