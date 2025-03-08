document.addEventListener("DOMContentLoaded", function() {
    const universities = document.querySelectorAll(".university");

    universities.forEach(university => {
        university.addEventListener("click", function(event) {
            event.preventDefault();
            alert("You selected " + this.innerText.trim());
            // You can redirect to another page or perform other actions here
        });
    });
});