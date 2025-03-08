function scrollToSection(id) {
    let section = document.getElementById(id);
    if (section) {
        let offset = 80; // Adjust for fixed header
        let position = section.getBoundingClientRect().top + window.scrollY - offset;

        window.scrollTo({
            top: position,
            behavior: "smooth"
        });
    }
}
