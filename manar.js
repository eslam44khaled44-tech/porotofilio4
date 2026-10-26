/* =========================================
   MANAR EL SAYED - PORTFOLIO
   JavaScript Interactions
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================
       1. SELECT ELEMENTS
    ===================================== */

    const body = document.body;

    const languageButton = document.getElementById("language-btn");
    const themeButton = document.getElementById("theme-btn");

    const navbarMenu = document.getElementById("navbarMenu");
    const navbarToggler = document.querySelector(".navbar-toggler");

    const profilePhoto = document.getElementById("profile-photo");
    const imagePlaceholder = document.getElementById("image-placeholder");

    const backToTopButton = document.getElementById("back-to-top");

    const navLinks = document.querySelectorAll(".nav-link");

    let currentLanguage = localStorage.getItem("portfolioLanguage") || "en";


    /* =====================================
       2. LANGUAGE SWITCHER
    ===================================== */

    function changeLanguage(language) {

        currentLanguage = language;

        // Update page language and direction
        document.documentElement.lang = language;
        document.documentElement.dir = language === "ar" ? "rtl" : "ltr";

        body.setAttribute(
            "dir",
            language === "ar" ? "rtl" : "ltr"
        );

        // Update all elements containing translations
        const translatedElements = document.querySelectorAll(
            "[data-en][data-ar]"
        );

        translatedElements.forEach(function (element) {

            const translation = element.getAttribute(
                language === "ar" ? "data-ar" : "data-en"
            );

            if (translation !== null) {
                element.textContent = translation;
            }

        });

        // Update language button
        if (languageButton) {
            languageButton.textContent = language === "en" ? "AR" : "EN";

            languageButton.setAttribute(
                "aria-label",
                language === "en"
                    ? "Switch to Arabic"
                    : "Switch to English"
            );
        }

        // Update document title
        document.title = language === "ar"
            ? "منار السيد | مصممة مواقع ويب"
            : "Manar El Sayed | Web Designer";

        // Save language preference
        localStorage.setItem("portfolioLanguage", language);

    }


    if (languageButton) {

        languageButton.addEventListener("click", function () {

            const newLanguage = currentLanguage === "en" ? "ar" : "en";

            changeLanguage(newLanguage);

        });

    }


    // Apply saved language when the page loads
    changeLanguage(currentLanguage);


    /* =====================================
       3. DARK MODE
    ===================================== */

    const savedTheme = localStorage.getItem("portfolioTheme");

// Make dark purple the default theme
if (savedTheme === null || savedTheme === "dark") {
    body.classList.add("dark-mode");
} else {
    body.classList.remove("dark-mode");
}

    function updateThemeButton() {

        if (!themeButton) return;

        const isDarkMode = body.classList.contains("dark-mode");

        themeButton.innerHTML = isDarkMode
            ? '<i class="fa-solid fa-sun"></i>'
            : '<i class="fa-solid fa-moon"></i>';

        themeButton.setAttribute(
            "aria-label",
            isDarkMode ? "Switch to light mode" : "Switch to dark mode"
        );

        themeButton.setAttribute(
            "title",
            isDarkMode ? "Light Mode" : "Dark Mode"
        );

    }

    updateThemeButton();


    if (themeButton) {

        themeButton.addEventListener("click", function () {

            body.classList.toggle("dark-mode");

            const isDarkMode = body.classList.contains("dark-mode");

            localStorage.setItem(
                "portfolioTheme",
                isDarkMode ? "dark" : "light"
            );

            updateThemeButton();

        });

    }


    /* =====================================
       4. PROFILE IMAGE FALLBACK
    ===================================== */

    function showImagePlaceholder() {

        if (profilePhoto) {

            profilePhoto.style.display = "none";

        }

        if (imagePlaceholder) {

            imagePlaceholder.style.display = "flex";

        }

    }


    function showProfileImage() {

        if (profilePhoto) {

            profilePhoto.style.display = "block";

        }

        if (imagePlaceholder) {

            imagePlaceholder.style.display = "none";

        }

    }


    if (profilePhoto) {

        // Show placeholder if the image fails to load
        profilePhoto.addEventListener("error", showImagePlaceholder);

        // Show image after it loads successfully
        profilePhoto.addEventListener("load", showProfileImage);

        // Handle cached images
        if (
            profilePhoto.complete &&
            profilePhoto.naturalWidth > 0
        ) {

            showProfileImage();

        } else if (
            profilePhoto.complete &&
            profilePhoto.naturalWidth === 0
        ) {

            showImagePlaceholder();

        }

    }


    /* =====================================
       5. SCROLL REVEAL ANIMATIONS
    ===================================== */

    const revealElements = document.querySelectorAll(
        ".section-heading, .about-card, .skill-card, " +
        ".personal-skill, .goal-card, .contact-content"
    );

    revealElements.forEach(function (element) {

        element.classList.add("reveal");

    });


    if ("IntersectionObserver" in window) {

        const revealObserver = new IntersectionObserver(

            function (entries, observer) {

                entries.forEach(function (entry) {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("visible");

                        observer.unobserve(entry.target);

                    }

                });

            },

            {
                threshold: 0.12
            }

        );


        revealElements.forEach(function (element) {

            revealObserver.observe(element);

        });

    } else {

        // Fallback for older browsers
        revealElements.forEach(function (element) {

            element.classList.add("visible");

        });

    }


    /* =====================================
       6. BACK TO TOP BUTTON
    ===================================== */

    function handleScroll() {

        if (!backToTopButton) return;

        if (window.scrollY > 350) {

            backToTopButton.classList.add("show");

        } else {

            backToTopButton.classList.remove("show");

        }

        updateActiveNavigation();

    }


    window.addEventListener("scroll", handleScroll, {
        passive: true
    });


    if (backToTopButton) {

        backToTopButton.addEventListener("click", function () {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        });

    }


    /* =====================================
       7. ACTIVE NAVIGATION LINK
    ===================================== */

    const sections = document.querySelectorAll(
        "main section[id]"
    );


    function updateActiveNavigation() {

        let currentSection = "home";

        sections.forEach(function (section) {

            const sectionTop = section.offsetTop - 150;

            if (window.scrollY >= sectionTop) {

                currentSection = section.id;

            }

        });


        navLinks.forEach(function (link) {

            link.classList.remove("active");

            if (
                link.getAttribute("href") === "#" + currentSection
            ) {

                link.classList.add("active");

            }

        });

    }


    updateActiveNavigation();


    /* =====================================
       8. MOBILE NAVIGATION
    ===================================== */

    navLinks.forEach(function (link) {

        link.addEventListener("click", function () {

            if (
                navbarMenu &&
                navbarMenu.classList.contains("show") &&
                window.bootstrap
            ) {

                const collapseInstance =
                    bootstrap.Collapse.getOrCreateInstance(navbarMenu);

                collapseInstance.hide();

            }

        });

    });


    /* =====================================
       9. CURRENT YEAR
    ===================================== */

    const currentYearElement = document.getElementById("current-year");

    if (currentYearElement) {

        currentYearElement.textContent = new Date().getFullYear();

    }


    /* =====================================
       10. SOCIAL ICONS
    ===================================== */

    // Social icons are decorative for now.
    // Add your actual profile links in HTML when you're ready.


    /* =====================================
       11. CONSOLE MESSAGE
    ===================================== */

    console.log(
        "%cWelcome to Manar El Sayed's Portfolio! 💜",
        "color: #a855f7; font-size: 16px; font-weight: bold;"
    );

});
