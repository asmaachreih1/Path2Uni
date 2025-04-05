document.addEventListener("DOMContentLoaded", function () {
    function navigateTo(university) {
        const basePath = "/Frontend/feastures/";  
        window.location.href = `${basePath}${university}/${university}.html`;
    }

    document.querySelectorAll(".university-card").forEach(card => {
        // Ensure only clicking outside the social links triggers navigation
        card.addEventListener("click", function (event) {
            // Check if the clicked element is NOT a social media link
            if (!event.target.closest(".social-links a")) {
                const university = this.getAttribute("data-university");
                navigateTo(university);
            }
        });
    });
});
