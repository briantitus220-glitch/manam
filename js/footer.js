/* ================================
   M'ANAM Footer
================================ */

const siteFooter = document.querySelector("#site-footer");

if (siteFooter) {
    siteFooter.innerHTML = `
        <footer class="site-footer">
            <div class="site-footer-inner">
                <div class="site-footer-brand">
                    <a href="index.html" class="footer-logo" aria-label="M'ANAM home">
                        M'ANAM
                    </a>

                    <p class="footer-tagline">
                        The ANÚNA collective.
                    </p>
                </div>

                <nav class="footer-socials" aria-label="Social media links">
                    <a 
                        href="https://www.youtube.com/@anunachoir" 
                        class="footer-social-link" 
                        target="_blank" 
                        rel="noopener"
                        aria-label="Visit ANÚNA on YouTube"
                    >
                        <span class="footer-social-icon" aria-hidden="true">
                            <svg viewBox="0 0 24 24" focusable="false">
                                <path d="M21.58 7.19c-.23-.86-.91-1.54-1.77-1.77C18.25 5 12 5 12 5s-6.25 0-7.81.42c-.86.23-1.54.91-1.77 1.77C2 8.75 2 12 2 12s0 3.25.42 4.81c.23.86.91 1.54 1.77 1.77C5.75 19 12 19 12 19s6.25 0 7.81-.42c.86-.23 1.54-.91 1.77-1.77C22 15.25 22 12 22 12s0-3.25-.42-4.81ZM10 15V9l5.2 3L10 15Z" />
                            </svg>
                        </span>
                    </a>

                    <a 
                        href="https://www.facebook.com/manammen/" 
                        class="footer-social-link" 
                        target="_blank" 
                        rel="noopener"
                        aria-label="Visit M'ANAM on Facebook"
                    >
                        <span class="footer-social-icon" aria-hidden="true">
                            <svg viewBox="0 0 24 24" focusable="false">
                                <path d="M14.05 8.64V6.82c0-.52.12-.9.36-1.14.24-.24.65-.36 1.22-.36h1.78V2.14C16.55 2.05 15.72 2 14.91 2c-1.66 0-2.95.49-3.88 1.47-.93.98-1.39 2.37-1.39 4.16v1.01H7v3.56h2.64V22h4.41v-9.8h2.94l.47-3.56h-3.41Z" />
                            </svg>
                        </span>
                    </a>
                </nav>
            </div>
        </footer>
    `;
}