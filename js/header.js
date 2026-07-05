/* ================================
   M'ANAM HEADER
   Injected navigation
================================ */

const siteHeader = document.querySelector("#site-header");

if (siteHeader) {
    const navLinks = [{
            label: "Home",
            href: "index.html"
        },
        {
            label: "About",
            href: "about.html"
        },
        {
            label: "Merch",
            href: "merch.html"
        },
        {
            label: "The ANÚNA Collective",
            href: "collective.html"
        },
        {
            label: "News",
            href: "news.html"
        },
        {
            label: "Tour",
            href: "tour.html"
        },
        {
            label: "Contact",
            href: "contact.html",
            cta: true
        }
    ];

    const currentPage = window.location.pathname.split("/").pop() || "index.html";

    const navMarkup = navLinks
        .map((link) => {
            const isActive =
                currentPage === link.href ||
                (currentPage === "" && link.href === "index.html");

            const classNames = [
                    "site-nav-link",
                    isActive ? "active" : "",
                    link.cta ? "nav-cta" : ""
                ]
                .filter(Boolean)
                .join(" ");

            return `
                <a href="${link.href}" class="${classNames}">
                    ${link.label}
                </a>
            `;
        })
        .join("");

    siteHeader.innerHTML = `
        <header class="site-header">
            <div class="site-header-inner">
                <a href="index.html" class="site-logo" aria-label="M'ANAM home">
                    <span class="site-logo-main">M'ANAM</span>
                    <span class="site-logo-runes">ᛗᚨᚾᚨᛗ</span>
                </a>

                <button 
                    class="nav-toggle" 
                    type="button" 
                    aria-label="Open navigation menu"
                    aria-expanded="false"
                >
                    <span></span>
                    <span></span>
                </button>

                <nav class="site-nav" aria-label="Main navigation">
                    ${navMarkup}
                </nav>
            </div>
        </header>
    `;

    const navToggle = siteHeader.querySelector(".nav-toggle");
    const siteNav = siteHeader.querySelector(".site-nav");

    navToggle.addEventListener("click", () => {
        const isOpen = siteNav.classList.toggle("open");

        navToggle.classList.toggle("open", isOpen);
        navToggle.setAttribute("aria-expanded", String(isOpen));
    });

    siteNav.addEventListener("click", (event) => {
        if (event.target.closest("a")) {
            siteNav.classList.remove("open");
            navToggle.classList.remove("open");
            navToggle.setAttribute("aria-expanded", "false");
            document.body.classList.remove("no-scroll");
        }
    });
}