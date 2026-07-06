/* ================================
   Background Elder Futhark Runes
   Reusable atmospheric rune field
================================ */

(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    /*
        Thematically chosen Elder Futhark runes.

        ᚨ Ansuz   = voice, breath, divine inspiration
        ᚱ Raidho  = journey, rhythm, movement
        ᚷ Gebo    = gift, exchange, offering
        ᚹ Wunjo   = joy, harmony
        ᚺ Hagalaz = storm, disruption, raw natural force
        ᛁ Isa     = stillness, ice, suspension
        ᛃ Jera    = cycle, harvest, return
        ᛇ Eihwaz  = yew, endurance, threshold
        ᛈ Perthro = mystery, fate, hidden ritual
        ᛉ Algiz   = protection, invocation
        ᛋ Sowilo  = sun, vitality, illumination
        ᛏ Tiwaz   = courage, oath, direction
        ᛒ Berkano = growth, becoming
        ᛖ Ehwaz   = motion, partnership
        ᛗ Mannaz  = human, community, collective
        ᛟ Othala  = inheritance, ancestry, home
    */

    const runeSymbols = [
        "ᚨ", "ᚱ", "ᚷ", "ᚹ", "ᚺ", "ᛁ", "ᛃ", "ᛇ",
        "ᛈ", "ᛉ", "ᛋ", "ᛏ", "ᛒ", "ᛖ", "ᛗ", "ᛟ"
    ];

    /*
        Short clusters only.

        ᚨᚾᚢ = voice / spirit fragment
        ᛗᚨᚾ = human / M'ANAM fragment
        ᚱᛁᛏ = ritual / rhythm fragment
        ᛊᛟᚾ = sound / song fragment
        ᛉᚨᚱ = protection / breath fragment
        ᛇᚱᚨ = threshold / journey fragment
    */

    const runeClusters = [
        "ᚨᚾᚢ",
        "ᛗᚨᚾ",
        "ᚱᛁᛏ",
        "ᛊᛟᚾ",
        "ᛉᚨᚱ",
        "ᛇᚱᚨ"
    ];

    /*
        The only longer cluster.
        Elder Futhark approximation of M'ANAM:
        ᛗ = M
        ᚨ = A
        ᚾ = N
        ᚨ = A
        ᛗ = M
    */

    const manamRune = "ᛗᚨᚾᚨᛗ";

    const bodyColours = [
        "rgba(255, 255, 255, 0.2)",
        "rgba(170, 170, 180, 0.18)",
        "rgba(0, 0, 0, 0.24)",
        "rgba(101, 3, 3, 0.28)"
    ];

    const heroColours = [
        "rgba(255, 255, 255, 0.2)",
        "rgba(185, 185, 195, 0.18)",
        "rgba(0, 0, 0, 0.22)"
    ];

    const randomBetween = (minimum, maximum) => {
        return Math.random() * (maximum - minimum) + minimum;
    };

    const randomItem = (items) => {
        return items[Math.floor(Math.random() * items.length)];
    };

    const createStyle = () => {
        const style = document.createElement("style");

        style.textContent = `
            .background-runes {
                position: fixed;
                inset: 0;
                z-index: 0;
                overflow: hidden;
                pointer-events: none;
                user-select: none;
            }

            .hero-background-runes {
                position: absolute;
                inset: 0;
                z-index: 1;
                overflow: hidden;
                pointer-events: none;
                user-select: none;
            }

            .background-rune {
                position: absolute;
                left: var(--rune-left);
                top: var(--rune-top);

                display: block;
                color: var(--rune-colour);

                /*
                    System rune-capable fonts are listed before the decorative token.
                    This prevents a decorative webfont from swallowing Unicode runes as blank glyphs.
                */
                font-family: "Segoe UI Symbol", "Noto Sans Runic", var(--font-rune), serif;

                font-size: var(--rune-size);
                font-weight: 400;
                line-height: 1;
                letter-spacing: 0.18em;
                white-space: nowrap;

                opacity: 0;
                filter: blur(var(--rune-blur));
                text-shadow: 0 0 1.2rem currentColor;

                transform:
                    translate3d(0, 0, 0)
                    rotate(var(--rune-rotate))
                    scale(var(--rune-scale));

                animation:
                    backgroundRuneFade var(--rune-fade-duration) ease-in-out var(--rune-delay) infinite,
                    backgroundRuneDrift var(--rune-drift-duration) ease-in-out var(--rune-delay) infinite alternate;

                will-change: opacity, transform;
            }

            .background-rune.is-manam-rune {
                letter-spacing: 0.32em;
            }

            #site-header {
                position: relative;
                z-index: 200;
            }

            main,
            #site-footer {
                position: relative;
                z-index: 1;
            }

            .hero {
                isolation: isolate;
            }

            .hero::before {
                z-index: 0;
            }

            .hero-background-runes {
                z-index: 1;
            }

            .hero-smoke {
                z-index: 2;
            }

            .hero-content {
                z-index: 3;
            }

            .hero::after {
                z-index: 4;
            }

            @keyframes backgroundRuneFade {
                0% {
                    opacity: 0;
                }

                18% {
                    opacity: var(--rune-opacity);
                }

                72% {
                    opacity: var(--rune-opacity);
                }

                100% {
                    opacity: 0;
                }
            }

            @keyframes backgroundRuneDrift {
                0% {
                    transform:
                        translate3d(0, 0, 0)
                        rotate(var(--rune-rotate))
                        scale(var(--rune-scale));
                }

                100% {
                    transform:
                        translate3d(var(--rune-drift-x), var(--rune-drift-y), 0)
                        rotate(calc(var(--rune-rotate) + var(--rune-rotate-drift)))
                        scale(var(--rune-scale));
                }
            }

            @media (prefers-reduced-motion: reduce) {
                .background-rune {
                    animation: none;
                    opacity: calc(var(--rune-opacity) * 0.65);
                }
            }
        `;

        document.head.appendChild(style);
    };

    const chooseRuneText = () => {
        const chance = Math.random();

        if (chance > 0.965) {
            return {
                text: manamRune,
                isManam: true
            };
        }

        if (chance > 0.78) {
            return {
                text: randomItem(runeClusters),
                isManam: false
            };
        }

        return {
            text: randomItem(runeSymbols),
            isManam: false
        };
    };

    const createRune = (layer, options = {}) => {
        const rune = document.createElement("span");
        const runeChoice = chooseRuneText();

        rune.className = "background-rune";
        rune.textContent = runeChoice.text;
        rune.setAttribute("aria-hidden", "true");

        if (runeChoice.isManam) {
            rune.classList.add("is-manam-rune");
        }

        const colourSet = options.colours || bodyColours;
        const baseOpacity = options.baseOpacity || 0.16;
        const sizeMinimum = options.sizeMinimum || 0.85;
        const sizeMaximum = options.sizeMaximum || 2.2;

        rune.style.setProperty("--rune-left", `${randomBetween(-4, 96)}%`);
        rune.style.setProperty("--rune-top", `${randomBetween(-4, 96)}%`);
        rune.style.setProperty("--rune-colour", randomItem(colourSet));
        rune.style.setProperty("--rune-size", `${randomBetween(sizeMinimum, sizeMaximum)}rem`);
        rune.style.setProperty("--rune-opacity", randomBetween(baseOpacity * 0.45, baseOpacity));
        rune.style.setProperty("--rune-blur", `${randomBetween(0, 0.75)}px`);
        rune.style.setProperty("--rune-rotate", `${randomBetween(-18, 18)}deg`);
        rune.style.setProperty("--rune-rotate-drift", `${randomBetween(-8, 8)}deg`);
        rune.style.setProperty("--rune-scale", randomBetween(0.82, 1.16));
        rune.style.setProperty("--rune-drift-x", `${randomBetween(-22, 22)}px`);
        rune.style.setProperty("--rune-drift-y", `${randomBetween(-34, 34)}px`);
        rune.style.setProperty("--rune-fade-duration", `${randomBetween(13, 28)}s`);
        rune.style.setProperty("--rune-drift-duration", `${randomBetween(18, 36)}s`);
        rune.style.setProperty("--rune-delay", `${randomBetween(-18, 0)}s`);

        layer.appendChild(rune);
    };

    const createRuneLayer = ({
        className,
        parent,
        count,
        colours,
        baseOpacity,
        sizeMinimum,
        sizeMaximum
    }) => {
        const layer = document.createElement("div");

        layer.className = className;
        layer.setAttribute("aria-hidden", "true");

        parent.prepend(layer);

        for (let index = 0; index < count; index += 1) {
            createRune(layer, {
                colours,
                baseOpacity,
                sizeMinimum,
                sizeMaximum
            });
        }

        return layer;
    };

    const initialiseBackgroundRunes = () => {
        createStyle();

        createRuneLayer({
            className: "background-runes",
            parent: document.body,
            count: prefersReducedMotion ? 18 : 42,
            colours: bodyColours,
            baseOpacity: 0.18,
            sizeMinimum: 0.85,
            sizeMaximum: 2.2
        });

        const hero = document.querySelector(".hero");

        if (hero) {
            createRuneLayer({
                className: "hero-background-runes",
                parent: hero,
                count: prefersReducedMotion ? 12 : 30,
                colours: heroColours,
                baseOpacity: 0.2,
                sizeMinimum: 0.9,
                sizeMaximum: 2.6
            });
        }
    };

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initialiseBackgroundRunes);
    } else {
        initialiseBackgroundRunes();
    }
})();
