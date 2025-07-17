document.addEventListener('DOMContentLoaded', () => {
    // Get references to DOM elements
    const header = document.getElementById('header');
    const navLinks = document.querySelectorAll('.nav-link');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const closeMenuButton = document.getElementById('close-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const sections = document.querySelectorAll('section'); // All sections with IDs

    // --- Sticky Header Functionality ---
    const handleScroll = () => {
        // Add or remove 'sticky' class based on scroll position
        if (window.scrollY > 50) { // Adjust this value as needed
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }

        // --- Active Navigation Link Highlighting ---
        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - header.offsetHeight; // Adjust for header height
            const sectionHeight = section.offsetHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSectionId = section.id;
            }
        });

        // Remove 'active' from all links
        navLinks.forEach(link => link.classList.remove('active'));
        mobileNavLinks.forEach(link => link.classList.remove('active'));

        // Add 'active' to the current section's link
        if (currentSectionId) {
            document.querySelectorAll(`.nav-link[href="#${currentSectionId}"]`).forEach(link => {
                link.classList.add('active');
            });
            document.querySelectorAll(`.mobile-nav-link[href="#${currentSectionId}"]`).forEach(link => {
                link.classList.add('active');
            });
        }
    };

    // Attach scroll event listener
    window.addEventListener('scroll', handleScroll);
    // Call once on load to set initial state
    handleScroll();

    // --- Mobile Menu Toggle ---
    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.add('active'); // Show mobile menu
        document.body.style.overflow = 'hidden'; // Prevent scrolling when menu is open
    });

    closeMenuButton.addEventListener('click', () => {
        mobileMenu.classList.remove('active'); // Hide mobile menu
        document.body.style.overflow = ''; // Re-enable scrolling
    });

    // Close mobile menu when a link is clicked
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active'); // Hide mobile menu
            document.body.style.overflow = ''; // Re-enable scrolling
        });
    });

    // --- Smooth Scrolling for all internal links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault(); // Prevent default jump behavior

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Calculate scroll position, accounting for fixed header
                const headerOffset = header.offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
                const offsetPosition = elementPosition - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth" // Smooth scroll
                });
            }
        });
    });
});
