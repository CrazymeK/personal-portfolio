const menuButton = document.getElementById("menu-btn");
const navLinks = document.getElementById("nav-links");

if (menuButton && navLinks) {
    menuButton.addEventListener("click", function () {
        navLinks.classList.toggle("show");
    });
}

if (navLinks) {
    const links = navLinks.querySelectorAll("a");

    links.forEach(function (link) {
        link.addEventListener("click", function () {
            navLinks.classList.remove("show");
        });
    });
}


const themeButton = document.getElementById("theme-btn");

const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");

    if (themeButton) {
        themeButton.textContent = "Light";
    }
} else {
    if (themeButton) {
        themeButton.textContent = "Dark";
    }
}

if (themeButton) {
    themeButton.addEventListener("click", function () {
        document.body.classList.toggle("dark-mode");

        if (document.body.classList.contains("dark-mode")) {
            themeButton.textContent = "Light";
            localStorage.setItem("theme", "dark");
        } else {
            themeButton.textContent = "Dark";
            localStorage.setItem("theme", "light");
        }
    });
}


const currentPage = window.location.pathname.split("/").pop();
const navigationLinks = document.querySelectorAll(".nav-links a");

navigationLinks.forEach(function (link) {
    const linkPage = link.getAttribute("href");

    if (
        linkPage === currentPage ||
        (currentPage === "" && linkPage === "index.html")
    ) {
        link.classList.add("active");
    }
});


const filterButtons =
    document.querySelectorAll(".filter-btn");

const projectCards =
    document.querySelectorAll(".project-card");

filterButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        const selectedCategory =
            button.getAttribute("data-filter");

        filterButtons.forEach(function (btn) {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        projectCards.forEach(function (project) {
            const projectCategory =
                project.getAttribute("data-category");

            if (
                selectedCategory === "all" ||
                selectedCategory === projectCategory
            ) {
                project.classList.remove("hide");
            } else {
                project.classList.add("hide");
            }
        });
    });
});


const scrollButton =
    document.getElementById("scroll-top");

window.addEventListener("scroll", function () {
    if (!scrollButton) {
        return;
    }

    if (window.scrollY > 300) {
        scrollButton.style.display = "block";
    } else {
        scrollButton.style.display = "none";
    }
});

if (scrollButton) {
    scrollButton.addEventListener("click", function () {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}


const contactForm =
    document.getElementById("contact-form");

if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const name =
            document.getElementById("name");

        const email =
            document.getElementById("email");

        const subject =
            document.getElementById("subject");

        const message =
            document.getElementById("message");

        const nameError =
            document.getElementById("name-error");

        const emailError =
            document.getElementById("email-error");

        const subjectError =
            document.getElementById("subject-error");

        const messageError =
            document.getElementById("message-error");

        const formSuccess =
            document.getElementById("form-success");

        nameError.textContent = "";
        emailError.textContent = "";
        subjectError.textContent = "";
        messageError.textContent = "";
        formSuccess.textContent = "";

        name.classList.remove("input-error");
        email.classList.remove("input-error");
        subject.classList.remove("input-error");
        message.classList.remove("input-error");

        let formIsValid = true;

        if (name.value.trim() === "") {
            nameError.textContent =
                "Please enter your name.";

            name.classList.add("input-error");
            formIsValid = false;
        }

        if (email.value.trim() === "") {
            emailError.textContent =
                "Please enter your email.";

            email.classList.add("input-error");
            formIsValid = false;

        } else if (!isValidEmail(email.value)) {
            emailError.textContent =
                "Please enter a valid email address.";

            email.classList.add("input-error");
            formIsValid = false;
        }

        if (subject.value.trim() === "") {
            subjectError.textContent =
                "Please enter a subject.";

            subject.classList.add("input-error");
            formIsValid = false;
        }

        if (message.value.trim() === "") {
            messageError.textContent =
                "Please enter your message.";

            message.classList.add("input-error");
            formIsValid = false;
        }

        if (formIsValid) {
            formSuccess.textContent =
                "Your message has been validated successfully!";

            contactForm.reset();
        }
    });
}


function isValidEmail(email) {
    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailPattern.test(email);
}


const typingText = document.getElementById("typing-text");

const words = [
    "IT Student",
    "Web Developer",
    "Programmer",
    "Tech Enthusiast"
];

let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    if (!typingText) {
        return;
    }

    const currentWord = words[wordIndex];

    if (isDeleting) {
        typingText.textContent =
            currentWord.substring(0, charIndex - 1);

        charIndex--;
    } else {
        typingText.textContent =
            currentWord.substring(0, charIndex + 1);

        charIndex++;
    }

    let speed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentWord.length) {
        speed = 1200;
        isDeleting = true;

    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex++;

        if (wordIndex === words.length) {
            wordIndex = 0;
        }

        speed = 300;
    }

    setTimeout(typeEffect, speed);
}

typeEffect();


const projectImages =
    document.querySelectorAll(".project-image");

const imageModal =
    document.getElementById("image-modal");

const modalImage =
    document.getElementById("modal-image");

const modalCaption =
    document.getElementById("modal-caption");

const modalClose =
    document.getElementById("modal-close");

projectImages.forEach(function (image) {
    image.addEventListener("click", function () {
        if (!imageModal || !modalImage) {
            return;
        }

        modalImage.src = image.src;
        modalImage.alt = image.alt;

        if (modalCaption) {
            modalCaption.textContent = image.alt;
        }

        imageModal.classList.add("show");
    });
});

if (modalClose) {
    modalClose.addEventListener("click", function () {
        imageModal.classList.remove("show");
    });
}

if (imageModal) {
    imageModal.addEventListener("click", function (event) {
        if (event.target === imageModal) {
            imageModal.classList.remove("show");
        }
    });
}

document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && imageModal) {
        imageModal.classList.remove("show");
    }
});


const skillBars =
    document.querySelectorAll(".skill-bar");

if (skillBars.length > 0) {
    const skillObserver =
        new IntersectionObserver(function (entries) {

            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    const bar = entry.target;

                    const level =
                        bar.getAttribute("data-level");

                    bar.style.width = level + "%";

                    skillObserver.unobserve(bar);
                }
            });

        }, {
            threshold: 0.3
        });

    skillBars.forEach(function (bar) {
        skillObserver.observe(bar);
    });
}


const accordionButtons =
    document.querySelectorAll(".accordion-button");

accordionButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        const accordionItem = button.parentElement;
        const symbol = button.querySelector("span");

        accordionItem.classList.toggle("open");

        if (accordionItem.classList.contains("open")) {
            symbol.textContent = "−";
        } else {
            symbol.textContent = "+";
        }
    });
});


const tabButtons =
    document.querySelectorAll(".tab-btn");

const tabContents =
    document.querySelectorAll(".tab-content");

tabButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        const selectedTab =
            button.getAttribute("data-tab");

        tabButtons.forEach(function (btn) {
            btn.classList.remove("active");
        });

        tabContents.forEach(function (content) {
            content.classList.remove("active");
        });

        button.classList.add("active");

        const selectedContent =
            document.getElementById(selectedTab);

        if (selectedContent) {
            selectedContent.classList.add("active");
        }
    });
});