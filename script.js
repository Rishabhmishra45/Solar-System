// === Create animated glowing and rotating stars ===
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

    container.style.animation = "rotate-stars 1800s linear infinite";
}

// === Set random initial rotation angle and start infinite CSS animation ===
function initializeOrbits() {
    const orbits = document.querySelectorAll(".orbit");

    orbits.forEach((orbit, index) => {
        const randomAngle = Math.floor(Math.random() * 360);
        orbit.style.transform = `translate(-50%, -50%) rotate(${randomAngle}deg)`;

        const duration = getComputedStyle(orbit).animationDuration;

        // Use a slight timeout to ensure transform is applied before animation starts
        setTimeout(() => {
            orbit.style.animation = `orbit-rotate ${duration} linear infinite`;
        }, 50);
    });
}

// === Rotate planets on their axis ===
function rotatePlanetsOnAxis() {
    const allPlanets = document.querySelectorAll(".planet, .earth-planet");

    allPlanets.forEach((planet, i) => {
        const duration = 2 + i * 0.5;
        planet.style.animation = `spinPlanet ${duration}s linear infinite`;
    });
}

// === Background music control ===
function playMusic() {
    const audio = document.getElementById("bg-music");
    audio.volume = 0.4;
    audio.play().catch(err => {
        console.warn("User interaction needed to play music:", err);
    });
}

// === Enter button ===
function enterSite() {
    const intro = document.getElementById("intro-screen");
    const mainContent = document.getElementById("main-content");

    intro.style.transition = "opacity 1s ease";
    intro.style.opacity = "0";

    setTimeout(() => {
        intro.style.display = "none";
        mainContent.style.display = "flex";
        playMusic();
    }, 1000);
}

// === On page load ===
window.addEventListener("DOMContentLoaded", () => {
    createStars();
    initializeOrbits();
    rotatePlanetsOnAxis();

    // Hide solar system initially
    document.getElementById("main-content").style.display = "none";
});
