/* ================================
   Reusable Fullscreen Image Viewer
================================ */

(() => {
    const viewerImages = Array.from(document.querySelectorAll("[data-fullscreen-image]"));

    if (!viewerImages.length) return;

    let currentIndex = 0;
    let touchStartX = 0;
    let touchEndX = 0;

    const viewer = document.createElement("div");
    viewer.className = "fullscreen-viewer";
    viewer.setAttribute("aria-hidden", "true");

    viewer.innerHTML = `
        <button class="fullscreen-viewer-close" type="button" aria-label="Close fullscreen image">
            ×
        </button>

        <button class="fullscreen-viewer-arrow fullscreen-viewer-prev" type="button" aria-label="Previous image">
            ‹
        </button>

        <figure class="fullscreen-viewer-figure">
            <img class="fullscreen-viewer-image" src="" alt="" />
            <figcaption class="fullscreen-viewer-caption"></figcaption>
        </figure>

        <button class="fullscreen-viewer-arrow fullscreen-viewer-next" type="button" aria-label="Next image">
            ›
        </button>
    `;

    document.body.appendChild(viewer);

    const viewerImage = viewer.querySelector(".fullscreen-viewer-image");
    const viewerCaption = viewer.querySelector(".fullscreen-viewer-caption");
    const closeButton = viewer.querySelector(".fullscreen-viewer-close");
    const previousButton = viewer.querySelector(".fullscreen-viewer-prev");
    const nextButton = viewer.querySelector(".fullscreen-viewer-next");

    const getImageCaption = (image) => {
        return (
            image.dataset.caption ||
            image.getAttribute("alt") ||
            ""
        );
    };

    const renderImage = () => {
        const image = viewerImages[currentIndex];

        viewerImage.src = image.currentSrc || image.src;
        viewerImage.alt = image.alt || "";

        const caption = getImageCaption(image);

        viewerCaption.textContent = caption;
        viewerCaption.hidden = !caption;
    };

    const openViewer = (index) => {
        currentIndex = index;
        renderImage();

        viewer.classList.add("is-open");
        viewer.setAttribute("aria-hidden", "false");

        document.body.classList.add("viewer-open");
    };

    const closeViewer = () => {
        viewer.classList.remove("is-open");
        viewer.setAttribute("aria-hidden", "true");

        document.body.classList.remove("viewer-open");

        window.setTimeout(() => {
            if (!viewer.classList.contains("is-open")) {
                viewerImage.src = "";
            }
        }, 300);
    };

    const showNextImage = () => {
        currentIndex = (currentIndex + 1) % viewerImages.length;
        renderImage();
    };

    const showPreviousImage = () => {
        currentIndex = (currentIndex - 1 + viewerImages.length) % viewerImages.length;
        renderImage();
    };

    viewerImages.forEach((image, index) => {
        image.setAttribute("tabindex", "0");
        image.setAttribute("role", "button");

        if (!image.getAttribute("aria-label")) {
            image.setAttribute("aria-label", "Open image fullscreen");
        }

        image.addEventListener("click", () => {
            openViewer(index);
        });

        image.addEventListener("keydown", (event) => {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                openViewer(index);
            }
        });
    });

    closeButton.addEventListener("click", closeViewer);
    nextButton.addEventListener("click", showNextImage);
    previousButton.addEventListener("click", showPreviousImage);

    viewer.addEventListener("click", (event) => {
        if (event.target === viewer) {
            closeViewer();
        }
    });

    document.addEventListener("keydown", (event) => {
        if (!viewer.classList.contains("is-open")) return;

        if (event.key === "Escape") {
            closeViewer();
        }

        if (event.key === "ArrowRight") {
            showNextImage();
        }

        if (event.key === "ArrowLeft") {
            showPreviousImage();
        }
    });

    viewer.addEventListener("touchstart", (event) => {
        touchStartX = event.changedTouches[0].clientX;
    }, { passive: true });

    viewer.addEventListener("touchend", (event) => {
        touchEndX = event.changedTouches[0].clientX;

        const swipeDistance = touchEndX - touchStartX;
        const minimumSwipeDistance = 50;

        if (Math.abs(swipeDistance) < minimumSwipeDistance) return;

        if (swipeDistance < 0) {
            showNextImage();
        } else {
            showPreviousImage();
        }
    }, { passive: true });
})();