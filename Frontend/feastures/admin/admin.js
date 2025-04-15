      



      


// Select the sidebar, menu icon, close button, and body
const menuIcon = document.getElementById('menu-icon');
const sidebar = document.getElementById('sidebar');
const closeBtn = document.getElementById('close-btn');
const body = document.body;

// Toggle Sidebar Open/Close
menuIcon.addEventListener('click', () => {
    sidebar.classList.toggle('open'); // Toggle sidebar
    body.classList.toggle('sidebar-open'); // Move header along with sidebar
});

// Close Sidebar when the close button is clicked
closeBtn.addEventListener('click', () => {
    sidebar.classList.remove('open'); // Close sidebar
    body.classList.remove('sidebar-open'); // Reset header position
});

