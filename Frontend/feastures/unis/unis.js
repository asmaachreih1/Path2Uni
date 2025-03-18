document.addEventListener("DOMContentLoaded", function() {
    function navigateTo(university) {
        // Corrected base path (since everything is inside "feastures")
        const basePath = "/Frontend/feastures/";  
        window.location.href = `${basePath}${university}/${university}.html`;
    }

    document.querySelectorAll(".university-card").forEach(card => {
        card.addEventListener("click", function() {
            const university = this.getAttribute("data-university");
            navigateTo(university);
        });
    });
});
