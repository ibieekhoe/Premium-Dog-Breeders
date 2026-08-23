 //====================================
// MOBILE MENU
//====================================

const menuBtn = document.querySelector(".menu-btn");
const nav = document.querySelector("nav");
const menuIcon = document.querySelector(".menu-btn i");

if (menuBtn && nav && menuIcon) {

    menuBtn.addEventListener("click", function () {

        nav.classList.toggle("show");

        if (nav.classList.contains("show")) {
            menuIcon.classList.remove("fa-bars");
            menuIcon.classList.add("fa-xmark");
        } else {
            menuIcon.classList.remove("fa-xmark");
            menuIcon.classList.add("fa-bars");
        }

    });

}


//====================================
// CLOSE MENU WHEN LINK IS CLICKED
//====================================

const navLinks = document.querySelectorAll("nav a");

navLinks.forEach(function (link) {

    link.addEventListener("click", function () {

        if (nav) {
            nav.classList.remove("show");
        }

        if (menuIcon) {
            menuIcon.classList.remove("fa-xmark");
            menuIcon.classList.add("fa-bars");
        }

    });

});


//====================================
// STICKY HEADER
//====================================

const header = document.querySelector("header");

window.addEventListener("scroll", function () {

    if (!header) {
        return;
    }

    if (window.scrollY > 100) {

        header.style.background = "#050505";
        header.style.padding = "15px 8%";
        header.style.boxShadow = "0 5px 20px rgba(0,0,0,.4)";

    } else {

        header.style.background = "rgba(0,0,0,.35)";
        header.style.padding = "20px 8%";
        header.style.boxShadow = "none";

    }

});


//====================================
// ACTIVE NAVIGATION
//====================================

const sections = document.querySelectorAll("section");

window.addEventListener("scroll", function () {

    let current = "";

    sections.forEach(function (section) {

        const top = section.offsetTop - 120;

        if (window.scrollY >= top) {
            current = section.getAttribute("id");
        }

    });

    navLinks.forEach(function (link) {

        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + current) {
            link.classList.add("active");
        }

    });

});


//====================================
// SCROLL REVEAL
//====================================

function revealElements() {

    const reveals = document.querySelectorAll(
        ".service-box, .dog-card, .process-box, .gallery-item, .testimonial-card, .about-image, .about-text, .booking-content, .booking-form, .contact-info, .contact-form"
    );

    reveals.forEach(function (item) {

        const windowHeight = window.innerHeight;
        const revealTop = item.getBoundingClientRect().top;

        if (revealTop < windowHeight - 120) {
            item.classList.add("show");
        }

    });

}

window.addEventListener("scroll", revealElements);

revealElements();


//====================================
// BACK TO TOP
//====================================

const backTop = document.querySelector(".back-top");

window.addEventListener("scroll", function () {

    if (!backTop) {
        return;
    }

    if (window.scrollY > 500) {

        backTop.style.opacity = "1";
        backTop.style.pointerEvents = "auto";

    } else {

        backTop.style.opacity = "0";
        backTop.style.pointerEvents = "none";

    }

});


//====================================
// SMOOTH SCROLL
//====================================

document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {

    anchor.addEventListener("click", function (event) {

        event.preventDefault();

        const target = document.querySelector(
            this.getAttribute("href")
        );

        if (target) {

            target.scrollIntoView({
                behavior: "smooth"
            });

        }

    });

});


//====================================
// LOAD TESTIMONIALS FROM CMS
//====================================

async function loadTestimonials() {

    try {

        const response = await fetch("content/website.yml");

        if (!response.ok) {
            throw new Error("Could not load website.yml");
        }

        const yamlText = await response.text();

        const data = jsyaml.load(yamlText);

        const testimonials = data.testimonials;

        const container = document.querySelector(
            ".testimonial-container"
        );

        if (!container || !testimonials) {
            return;
        }

        container.innerHTML = "";

        testimonials.forEach(function (testimonial) {

            const card = document.createElement("div");

            card.className = "testimonial-card";

            card.innerHTML = `
                <img
                    src="${testimonial.image}"
                    alt="${testimonial.name}"
                >

                <h3>${testimonial.name}</h3>

                <span>${testimonial.rating}</span>

                <p>${testimonial.text}</p>
            `;

            container.appendChild(card);

        });

        revealElements();

    } catch (error) {

        console.error(
            "Could not load testimonials:",
            error
        );

    }

}


//====================================
// LOAD BREEDING DOGS FROM CMS
//====================================

async function loadDogs() {

    try {

        const response = await fetch("content/dogs.json");

        if (!response.ok) {
            throw new Error("Could not load dogs.json");
        }

        const data = await response.json();

        const dogs = data.dogs;

        const container = document.querySelector(
            "#dog-container"
        );

        if (!container || !dogs) {
            return;
        }

        // Clear the loading message
        container.innerHTML = "";


        //====================================
        // CREATE DOG CARDS
        //====================================

        dogs.forEach(function (dog) {

            const card = document.createElement("div");

            card.className = "dog-card";


            // DOG IMAGE
            const image = document.createElement("img");

            image.src = dog.image || "";

            image.alt = dog.breed || dog.name || "Dog";


            // DOG INFORMATION
            const info = document.createElement("div");

            info.className = "dog-info";


            // DOG NAME
            const name = document.createElement("h3");

            name.textContent = dog.name || "Dog";


            // BREED
            const breed = document.createElement("span");

            breed.textContent = dog.breed || "Breed not set";


            // GENDER
            const gender = document.createElement("p");

            gender.innerHTML =
                "<strong>Gender:</strong> " +
                (dog.gender || "Not Set");


            // AGE
            const age = document.createElement("p");

            age.innerHTML =
                "<strong>Age:</strong> " +
                (dog.age || "Not Set");


            // WEIGHT
            const weight = document.createElement("p");

            weight.innerHTML =
                "<strong>Weight:</strong> " +
                (dog.weight || "Not Set");


            // STATUS
            const status = document.createElement("p");

            status.innerHTML =
                "<strong>Status:</strong> " +
                (dog.status || "Available");


            // AMOUNT
            const amount = document.createElement("p");

            amount.innerHTML =
                "<strong>Amount:</strong> " +
                (dog.amount || "₦0");


            // BOOKING BUTTON
            const button = document.createElement("a");

            button.href = "#booking";

            button.className = "dog-btn";

            button.textContent =
                dog.button_text || "Book Breeding";


            // BUILD DOG CARD
            info.appendChild(name);
            info.appendChild(breed);
            info.appendChild(gender);
            info.appendChild(age);
            info.appendChild(weight);
            info.appendChild(status);
            info.appendChild(amount);
            info.appendChild(button);

            card.appendChild(image);
            card.appendChild(info);

            container.appendChild(card);

        });


        // RUN SCROLL REVEAL AGAIN
        revealElements();


        console.log(
            dogs.length + " breeding dogs loaded successfully."
        );


    } catch (error) {

        console.error(
            "Could not load breeding dogs:",
            error
        );

        const container = document.querySelector(
            "#dog-container"
        );

        if (container) {

            container.innerHTML = `
                <p class="dogs-loading">
                    Unable to load breeding dogs.
                    Please try again later.
                </p>
            `;

        }

    }

}


//====================================
// START CMS LOADING
//====================================

loadTestimonials();

loadDogs();