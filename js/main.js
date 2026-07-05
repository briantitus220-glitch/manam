/* ================================
   M'ANAM MAIN JS
   Hero text parallax
================================ */

const heroSection = document.querySelector(".hero");

if (heroSection) {
    const updateHeroTextParallax = () => {
        const heroRect = heroSection.getBoundingClientRect();
        const viewportHeight = window.innerHeight;

        const heroIsVisible =
            heroRect.top < viewportHeight &&
            heroRect.bottom > 0;

        if (!heroIsVisible) return;

        const scrollProgress = Math.min(
            Math.max(-heroRect.top / heroRect.height, 0),
            1
        );

        /*
            Positive offset = text is pushed downward
            while the hero itself scrolls upward.

            This makes the text appear to rise more slowly
            than the bottom edge of the hero.
        */
        const movementAmount = window.innerWidth <= 820 ? 42 : 90;
        const textOffset = scrollProgress * movementAmount;

        heroSection.style.setProperty("--hero-text-scroll", `${textOffset}px`);
    };

    updateHeroTextParallax();

    window.addEventListener("scroll", updateHeroTextParallax, {
        passive: true
    });

    window.addEventListener("resize", updateHeroTextParallax);
}
/* ================================
   Mobile Button Snake Trace
================================ */

const traceButtons = document.querySelectorAll(".button");

traceButtons.forEach((button) => {
    button.addEventListener("click", () => {
        if (window.matchMedia("(hover: none)").matches) {
            button.classList.add("is-tracing");

            window.setTimeout(() => {
                button.classList.remove("is-tracing");
            }, 780);
        }
    });
});
/* ================================
   Hero Image Carousel
================================ */

const heroCarousel = document.querySelector("[data-hero-carousel]");

if (heroCarousel) {
    const heroSlides = [{
            src: "images/manam-hero-image1.png",
            alt: "M'ANAM performance image one",
            caption: "Ancient voices, modern ritual"
        },
        {
            src: "images/manam-hero-image2.png",
            alt: "M'ANAM performance image two",
            caption: "Sound, language, movement"
        },
        {
            src: "images/manam-hero-image-3.png ",
            alt: "M'ANAM performance image three",
            caption: "The ANÚNA collective"
        },
        {
            src: "images/manam-hero-image4.png",
            alt: "M'ANAM performance image three",
            caption: "Modern Manly man voices of men that are manly"
        }
    ];

    const activeImage = heroCarousel.querySelector("[data-carousel-active]");
    const previousImage = heroCarousel.querySelector("[data-carousel-prev]");
    const nextImage = heroCarousel.querySelector("[data-carousel-next]");
    const caption = heroCarousel.querySelector("[data-carousel-caption]");
    const dotsContainer = heroCarousel.querySelector("[data-carousel-dots]");
    const frame = heroCarousel.querySelector(".hero-carousel-frame");
    const previousButton = heroCarousel.querySelector(".hero-carousel-arrow-prev");
    const nextButton = heroCarousel.querySelector(".hero-carousel-arrow-next");

    let currentIndex = 0;
    let carouselTimer;

    const cycleDelay = 5000;
    const transitionDelay = 900;

    const getPreviousIndex = () => {
        return (currentIndex - 1 + heroSlides.length) % heroSlides.length;
    };

    const getNextIndex = () => {
        return (currentIndex + 1) % heroSlides.length;
    };

    const preloadImage = (src) => {
        return new Promise((resolve) => {
            const image = new Image();

            image.onload = () => {
                resolve(image);
            };

            image.onerror = () => {
                resolve(null);
            };

            image.src = src;
        });
    };

    const updateFrameWidth = async(src) => {
        const image = await preloadImage(src);

        if (!image || !frame) return;

        const frameHeight = frame.getBoundingClientRect().height;
        const imageRatio = image.naturalWidth / image.naturalHeight;

        const minimumWidth = 220;
        const maximumWidth = Math.min(window.innerWidth * 0.76, 620);

        const targetWidth = Math.max(
            minimumWidth,
            Math.min(frameHeight * imageRatio, maximumWidth)
        );

        frame.style.width = `${targetWidth}px`;
    };

    const createDots = () => {
        dotsContainer.innerHTML = "";

        heroSlides.forEach((slide, index) => {
            const dot = document.createElement("button");

            dot.className = "hero-carousel-dot";
            dot.type = "button";
            dot.setAttribute("aria-label", `Show image ${index + 1}`);

            dot.addEventListener("click", () => {
                goToSlide(index);
            });

            dotsContainer.appendChild(dot);
        });
    };

    const updateDots = () => {
        const dots = dotsContainer.querySelectorAll(".hero-carousel-dot");

        dots.forEach((dot, index) => {
            dot.classList.toggle("is-active", index === currentIndex);
        });
    };

    const renderSlides = async() => {
        const previousSlide = heroSlides[getPreviousIndex()];
        const activeSlide = heroSlides[currentIndex];
        const nextSlide = heroSlides[getNextIndex()];

        previousImage.src = previousSlide.src;
        previousImage.alt = previousSlide.alt;

        activeImage.src = activeSlide.src;
        activeImage.alt = activeSlide.alt;

        nextImage.src = nextSlide.src;
        nextImage.alt = nextSlide.alt;

        caption.textContent = activeSlide.caption;

        updateDots();
        await updateFrameWidth(activeSlide.src);
    };

    const goToSlide = (index) => {
        if (index === currentIndex) return;

        heroCarousel.classList.add("is-changing");

        window.setTimeout(() => {
            currentIndex = (index + heroSlides.length) % heroSlides.length;
            renderSlides();

            window.setTimeout(() => {
                heroCarousel.classList.remove("is-changing");
            }, 80);
        }, transitionDelay * 0.45);

        resetCarouselTimer();
    };

    const goToNextSlide = () => {
        goToSlide(currentIndex + 1);
    };

    const goToPreviousSlide = () => {
        goToSlide(currentIndex - 1);
    };

    const resetCarouselTimer = () => {
        window.clearInterval(carouselTimer);
        carouselTimer = window.setInterval(goToNextSlide, cycleDelay);
    };

    previousButton.addEventListener("click", goToPreviousSlide);
    nextButton.addEventListener("click", goToNextSlide);

    window.addEventListener("resize", () => {
        updateFrameWidth(heroSlides[currentIndex].src);
    });

    createDots();
    renderSlides();
    resetCarouselTimer();
}