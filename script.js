// === Planet Start Angles (deg) ===
const planetStartAngles = {
    mercury: 169,
    venus: 30,
    earth: 341,
    mars: 280,
    jupiter: 44,
    saturn: 120,
    uranus: 190,
    neptune: 300,
    pluto: 146
};

// === Create animated glowing stars ===
function createStars() {
    const container = document.getElementById("stars-container");

    for (let i = 0; i < 300; i++) {
        const star = document.createElement("div");
        star.className = "star";

        const size = Math.random() * 2 + 0.5;
        const top = `${Math.random() * 100}%`;
        const left = `${Math.random() * 100}%`;
        const opacity = Math.random();

        Object.assign(star.style, {
            width: `${size}px`,
            height: `${size}px`,
            top,
            left,
            position: "absolute",
            backgroundColor: "white",
            opacity,
            borderRadius: "50%",
            boxShadow: `0 0 ${size * 2}px white`,
            animation: `twinkle ${2 + Math.random() * 3}s infinite alternate`
        });

        container.appendChild(star);
    }
}

// === Apply planet orbit rotation with fixed start angle ===
function setPlanetAngles() {
    const orbits = document.querySelectorAll(".orbit");

    orbits.forEach(orbit => {
        const planetName = orbit.classList[1]; // e.g., 'mercury', 'venus', etc.
        const angle = planetStartAngles[planetName];

        if (angle !== undefined) {
            // Set initial rotation and continue 360deg animation
            orbit.style.transform = `translate(-50%, -50%) rotate(${angle}deg)`;
            orbit.style.animation = `orbit-rotate-${planetName} ${orbit.style.animationDuration || '40s'} linear infinite`;

            // Inject custom keyframe for each planet with specific start angle
            const styleSheet = document.styleSheets[0];
            const keyframeName = `orbit-rotate-${planetName}`;
            const keyframes =
                `@keyframes ${keyframeName} {
                    0% { transform: translate(-50%, -50%) rotate(${angle}deg); }
                    100% { transform: translate(-50%, -50%) rotate(${angle + 360}deg); }
                }`;
            styleSheet.insertRule(keyframes, styleSheet.cssRules.length);
        }
    });
}

// === Background music control ===
function playMusic() {
    const audio = document.getElementById("bg-music");
    audio.volume = 0.4;
    audio.play().catch(err => {
        console.warn("Music can't play until user interacts:", err);
    });
}

// === Remove intro screen & show solar system ===
function enterSite() {
    const intro = document.getElementById("intro-screen");
    const mainContent = document.getElementById("main-content");

    intro.style.transition = "opacity 1s ease";
    intro.style.opacity = "0";

    setTimeout(() => {
        intro.style.display = "none";
        mainContent.style.display = "flex";
        playMusic();
        setPlanetAngles();
    }, 1000);
}

// === On page load ===
window.addEventListener("DOMContentLoaded", () => {
    createStars();
    document.getElementById("main-content").style.display = "none";
});
