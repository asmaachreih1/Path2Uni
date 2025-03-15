
console.log("Scholarships page loaded!");

// Add hover effect to scholarship boxes
const scholarshipBoxes = document.querySelectorAll('.scholarship-box');

scholarshipBoxes.forEach(box => {
    box.addEventListener('click', () => {
        box.style.transform = 'translateY(-5px)';
        setTimeout(() => {
            box.style.transform = 'translateY(0)';
        }, 200);
    });
});
