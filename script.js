/* =====================================================
   MIKE ANTHONY PACRES
   ILLUSTRATOR / GENGA ARTIST PORTFOLIO
   INTERACTIVE JAVASCRIPT
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* =================================================
       MOBILE MENU
    ================================================= */

    const menuButton = document.getElementById("menuButton");
    const navigation = document.getElementById("navigation");

    if (menuButton && navigation) {

        menuButton.addEventListener("click", () => {
            navigation.classList.toggle("active");
            menuButton.classList.toggle("active");
        });

        navigation.querySelectorAll("a").forEach(link => {

            link.addEventListener("click", () => {
                navigation.classList.remove("active");
                menuButton.classList.remove("active");
            });

        });
    }


    /* =================================================
       NAVBAR SCROLL EFFECT
    ================================================= */

    const navbar = document.querySelector(".navbar");

    window.addEventListener("scroll", () => {

        if (!navbar) return;

        if (window.scrollY > 80) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }

    });


    /* =================================================
       TYPEWRITER EFFECT
    ================================================= */

    const typingText = document.querySelector(".typing-text");

    if (typingText) {

        const words = [
            "Illustrator",
            "Genga Artist",
            "Character Artist",
            "Traditional Artist",
            "Visual Storyteller"
        ];

        let wordIndex = 0;
        let letterIndex = 0;
        let deleting = false;

        function typeWriter() {

            const word = words[wordIndex];

            if (!deleting) {

                typingText.textContent =
                    word.substring(0, letterIndex + 1);

                letterIndex++;

                if (letterIndex === word.length) {

                    deleting = true;

                    setTimeout(typeWriter, 1300);
                    return;
                }

            } else {

                typingText.textContent =
                    word.substring(0, letterIndex - 1);

                letterIndex--;

                if (letterIndex === 0) {

                    deleting = false;

                    wordIndex++;

                    if (wordIndex >= words.length) {
                        wordIndex = 0;
                    }

                }

            }

            setTimeout(
                typeWriter,
                deleting ? 45 : 100
            );
        }

        typeWriter();
    }


    /* =================================================
       SCROLL REVEAL
    ================================================= */

    const revealElements = document.querySelectorAll(
        ".section, .art-card, .genga-card, .process-card, .skill-card, .timeline-item"
    );

    const revealObserver = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("show");

                    observer.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.12
        }
    );

    revealElements.forEach(element => {

        element.classList.add("reveal");

        revealObserver.observe(element);

    });


    /* =================================================
       MOUSE SPOTLIGHT
    ================================================= */

    const spotlight =
        document.createElement("div");

    spotlight.classList.add("mouse-spotlight");

    document.body.appendChild(spotlight);

    document.addEventListener("mousemove", event => {

        spotlight.style.left =
            event.clientX + "px";

        spotlight.style.top =
            event.clientY + "px";

    });


    /* =================================================
       PAINT / INK PARTICLES
    ================================================= */

    const particleContainer =
        document.createElement("div");

    particleContainer.classList.add(
        "particle-container"
    );

    document.body.appendChild(particleContainer);


    function createParticle() {

        const particle =
            document.createElement("span");

        particle.classList.add("paint-particle");

        const size =
            Math.random() * 5 + 2;

        const x =
            Math.random() * window.innerWidth;

        const y =
            Math.random() * window.innerHeight;

        particle.style.width =
            size + "px";

        particle.style.height =
            size + "px";

        particle.style.left =
            x + "px";

        particle.style.top =
            y + "px";

        particle.style.animationDuration =
            (Math.random() * 5 + 4) + "s";

        particleContainer.appendChild(
            particle
        );

        setTimeout(() => {

            particle.remove();

        }, 9000);
    }


    setInterval(createParticle, 500);


    /* =================================================
       ARTWORK TILT
    ================================================= */

    const cards = document.querySelectorAll(
        ".art-card, .genga-card"
    );

    cards.forEach(card => {

        card.addEventListener("mousemove", event => {

            const rect =
                card.getBoundingClientRect();

            const x =
                event.clientX - rect.left;

            const y =
                event.clientY - rect.top;

            const centerX =
                rect.width / 2;

            const centerY =
                rect.height / 2;

            const rotateX =
                ((y - centerY) / centerY) * -5;

            const rotateY =
                ((x - centerX) / centerX) * 5;

            card.style.transform =
                `perspective(900px)
                 rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)
                 translateY(-8px)`;

        });


        card.addEventListener("mouseleave", () => {

            card.style.transform =
                "perspective(900px) rotateX(0deg) rotateY(0deg)";

        });

    });


    /* =================================================
       ARTWORK LIGHTBOX
    ================================================= */

    const images =
        document.querySelectorAll(
            ".art-card img, .genga-card img"
        );

    const lightbox =
        document.getElementById("lightbox");

    const lightboxImage =
        document.getElementById("lightboxImage");

    const lightboxTitle =
        document.getElementById("lightboxTitle");

    const closeButton =
        document.getElementById("lightboxClose");

    const nextButton =
        document.getElementById("lightboxNext");

    const previousButton =
        document.getElementById(
            "lightboxPrevious"
        );


    let currentImage = 0;

    const gallery = [];


    images.forEach((image, index) => {

        gallery.push({
            src: image.src,
            title:
                image.dataset.title ||
                image.alt ||
                "Artwork"
        });


        image.addEventListener("click", () => {

            currentImage = index;

            openLightbox();

        });

    });


    function openLightbox() {

        if (!lightbox) return;

        lightbox.classList.add("active");

        document.body.classList.add(
            "no-scroll"
        );

        if (lightboxImage) {

            lightboxImage.src =
                gallery[currentImage].src;

        }

        if (lightboxTitle) {

            lightboxTitle.textContent =
                gallery[currentImage].title;

        }

    }


    function closeLightbox() {

        if (!lightbox) return;

        lightbox.classList.remove("active");

        document.body.classList.remove(
            "no-scroll"
        );

    }


    function nextImage() {

        currentImage++;

        if (currentImage >= gallery.length) {
            currentImage = 0;
        }

        openLightbox();

    }


    function previousImage() {

        currentImage--;

        if (currentImage < 0) {
            currentImage =
                gallery.length - 1;
        }

        openLightbox();

    }


    if (closeButton) {
        closeButton.addEventListener(
            "click",
            closeLightbox
        );
    }


    if (nextButton) {
        nextButton.addEventListener(
            "click",
            nextImage
        );
    }


    if (previousButton) {
        previousButton.addEventListener(
            "click",
            previousImage
        );
    }


    /* =================================================
       KEYBOARD GALLERY CONTROL
    ================================================= */

    document.addEventListener(
        "keydown",
        event => {

            if (
                !lightbox ||
                !lightbox.classList.contains("active")
            ) {
                return;
            }

            if (event.key === "Escape") {
                closeLightbox();
            }

            if (event.key === "ArrowRight") {
                nextImage();
            }

            if (event.key === "ArrowLeft") {
                previousImage();
            }

        }
    );


    /* =================================================
       PARALLAX HERO
    ================================================= */

    const heroArtwork =
        document.querySelector(".hero-artwork");

    window.addEventListener("scroll", () => {

        if (!heroArtwork) return;

        const movement =
            window.scrollY * 0.12;

        heroArtwork.style.transform =
            `translateY(${movement}px)`;

    });


    /* =================================================
       FLOATING ELEMENTS
    ================================================= */

    const floatingElements =
        document.querySelectorAll(
            ".floating"
        );

    floatingElements.forEach(
        (element, index) => {

            element.style.animationDelay =
                `${index * 0.4}s`;

        }
    );


    /* =================================================
       SKILL BAR ANIMATION
    ================================================= */

    const skillBars =
        document.querySelectorAll(
            ".skill-progress"
        );


    const skillObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        const progress =
                            entry.target.dataset.progress;

                        entry.target.style.width =
                            progress + "%";

                        skillObserver.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.5
            }
        );


    skillBars.forEach(bar => {

        bar.style.width = "0%";

        skillObserver.observe(bar);

    });


    /* =================================================
       COUNTER ANIMATION
    ================================================= */

    const counters =
        document.querySelectorAll(
            ".counter"
        );


    counters.forEach(counter => {

        const target =
            parseInt(
                counter.dataset.target
            );

        let current = 0;

        const updateCounter = () => {

            const increment =
                Math.max(
                    1,
                    Math.ceil(target / 80)
                );

            current += increment;

            if (current >= target) {

                counter.textContent =
                    target;

            } else {

                counter.textContent =
                    current;

                requestAnimationFrame(
                    updateCounter
                );

            }

        };

        const observer =
            new IntersectionObserver(
                entries => {

                    if (
                        entries[0].isIntersecting
                    ) {

                        updateCounter();

                        observer.disconnect();

                    }

                }
            );

        observer.observe(counter);

    });


    /* =================================================
       CUSTOM CURSOR
    ================================================= */

    const cursor =
        document.createElement("div");

    cursor.classList.add(
        "custom-cursor"
    );

    document.body.appendChild(cursor);


    document.addEventListener(
        "mousemove",
        event => {

            cursor.style.left =
                event.clientX + "px";

            cursor.style.top =
                event.clientY + "px";

        }
    );


    const interactiveElements =
        document.querySelectorAll(
            "a, button, .art-card, .genga-card"
        );


    interactiveElements.forEach(element => {

        element.addEventListener(
            "mouseenter",
            () => {

                cursor.classList.add(
                    "cursor-hover"
                );

            }
        );


        element.addEventListener(
            "mouseleave",
            () => {

                cursor.classList.remove(
                    "cursor-hover"
                );

            }
        );

    });


    /* =================================================
       SECTION TITLE DRAWING EFFECT
    ================================================= */

    const titles =
        document.querySelectorAll(
            ".section-title"
        );


    titles.forEach(title => {

        title.addEventListener(
            "mouseenter",
            () => {

                title.classList.add(
                    "title-active"
                );

            }
        );


        title.addEventListener(
            "mouseleave",
            () => {

                title.classList.remove(
                    "title-active"
                );

            }
        );

    });


    /* =================================================
       BACK TO TOP
    ================================================= */

    const backToTop =
        document.getElementById(
            "backToTop"
        );


    if (backToTop) {

        window.addEventListener(
            "scroll",
            () => {

                if (window.scrollY > 600) {

                    backToTop.classList.add(
                        "show"
                    );

                } else {

                    backToTop.classList.remove(
                        "show"
                    );

                }

            }
        );


        backToTop.addEventListener(
            "click",
            () => {

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });

            }
        );

    }


    /* =================================================
       IMAGE FADE-IN
    ================================================= */

    document.querySelectorAll(
        "img"
    ).forEach(image => {

        if (image.complete) {

            image.classList.add(
                "loaded"
            );

        } else {

            image.addEventListener(
                "load",
                () => {

                    image.classList.add(
                        "loaded"
                    );

                }
            );

        }

    });


    /* =================================================
       PAGE LOADING ANIMATION
    ================================================= */

    window.addEventListener(
        "load",
        () => {

            document.body.classList.add(
                "page-loaded"
            );

        }
    );


    /* =================================================
       SMOOTH ANCHOR SCROLL
    ================================================= */

    document.querySelectorAll(
        'a[href^="#"]'
    ).forEach(link => {

        link.addEventListener(
            "click",
            event => {

                const targetID =
                    link.getAttribute(
                        "href"
                    );

                if (
                    targetID === "#" ||
                    targetID === ""
                ) {
                    return;
                }

                const target =
                    document.querySelector(
                        targetID
                    );

                if (!target) return;

                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }
        );

    });


    /* =================================================
       ARTWORK RANDOM FLOATING MOVEMENT
    ================================================= */

    const floatingArtwork =
        document.querySelectorAll(
            ".floating-art"
        );


    floatingArtwork.forEach(
        artwork => {

            const duration =
                Math.random() * 3 + 4;

            const distance =
                Math.random() * 10 + 5;

            artwork.animate(
                [
                    {
                        transform:
                            "translateY(0px)"
                    },
                    {
                        transform:
                            `translateY(-${distance}px)`
                    },
                    {
                        transform:
                            "translateY(0px)"
                    }
                ],
                {
                    duration:
                        duration * 1000,
                    iterations:
                    Infinity,
                    easing:
                        "ease-in-out"
                }
            );

        }
    );


    /* =================================================
       MAGNETIC BUTTON EFFECT
    ================================================= */

    const magneticButtons =
        document.querySelectorAll(
            ".magnetic"
        );


    magneticButtons.forEach(button => {

        button.addEventListener(
            "mousemove",
            event => {

                const rect =
                    button.getBoundingClientRect();

                const x =
                    event.clientX -
                    rect.left -
                    rect.width / 2;

                const y =
                    event.clientY -
                    rect.top -
                    rect.height / 2;

                button.style.transform =
                    `translate(${x * 0.15}px,
                               ${y * 0.15}px)`;

            }
        );


        button.addEventListener(
            "mouseleave",
            () => {

                button.style.transform =
                    "translate(0, 0)";

            }
        );

    });


    /* =================================================
       CONSOLE
    ================================================= */

    console.log(
        "%c MIKE ANTHONY PACRES ",
        "font-size:20px;font-weight:bold;"
    );

    console.log(
        "Illustrator • Genga Artist • Visual Storyteller"
    );

});