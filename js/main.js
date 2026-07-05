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