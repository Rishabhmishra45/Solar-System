// === Create animated glowing stars ===
function createStars() {
    const container = document.getElementById("stars-container");

    for (let i = 0; i < 300; i++) {
        const star = document.createElement("div");
        star.className = "star";

        const size = Math.random() * 2 + 0.5; // 0.5px to 2.5px
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

// === Background music control ===
function playMusic() {
    const audio = document.getElementById("bg-music");
    audio.volume = 0.4;

    // Safe autoplay with user interaction fallback
    audio.play().catch(err => {
        console.warn("Music can't play until user interacts:", err);
    });
}

// === Remove intro screen & show solar system ===
function enterSite() {
    const intro = document.getElementById("intro-screen");
    const mainContent = document.getElementById("main-content");

    // Add fade-out effect
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

    // Hide main content initially
    document.getElementById("main-content").style.display = "none";
});
