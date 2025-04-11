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
      const planetName = orbit.classList[1];
      const angle = planetStartAngles[planetName];
  
      if (angle !== undefined) {
        // Reset transform first
        orbit.style.transform = "";
        
        // Apply new transform
        orbit.style.transform = `translate(-50%, -50%) rotate(${angle}deg)`;
        
        // Create unique animation for each planet
        const animationName = `orbit-rotate-${planetName}`;
        const duration = orbit.style.animationDuration || '40s';
        
        const styleSheet = document.styleSheets[0];
        const keyframes = `
          @keyframes ${animationName} {
            0% { transform: translate(-50%, -50%) rotate(${angle}deg); }
            100% { transform: translate(-50%, -50%) rotate(${angle + 360}deg); }
          }
        `;
        
        // Remove old animation if it exists
        for (let i = 0; i < styleSheet.cssRules.length; i++) {
          if (styleSheet.cssRules[i].name === animationName) {
            styleSheet.deleteRule(i);
            break;
          }
        }
        
        styleSheet.insertRule(keyframes, styleSheet.cssRules.length);
        orbit.style.animation = `${animationName} ${duration} linear infinite`;
      }
    });
  }
  
  // DOM Elements
  const introScreen = document.getElementById('intro-screen');
  const navbar = document.querySelector('.navbar');
  const solarSystem = document.querySelector('.solar-system');
  const viewToggle = document.getElementById('viewToggle');
  const bgMusic = document.getElementById('bg-music');
  
  // Initialize the solar system
  let is3DView = false;
  let musicPlaying = false;
  
  // Enter the site (hide intro screen)
// Update your enterSite() function
function enterSite() {
  const intro = document.getElementById("intro-screen");
  const navbar = document.querySelector(".navbar");
  const mainContent = document.getElementById("main-content");

  intro.style.opacity = "0";
  
  setTimeout(() => {
    intro.style.display = "none";
    mainContent.style.display = "block";
    
    // Show navbar by removing 'hidden' class and adding 'visible'
    navbar.classList.remove('hidden');
    navbar.classList.add('visible');
    
    playMusic();
    setPlanetAngles();
  }, 1000);
}

// Make sure navbar is hidden on initial load
window.addEventListener('DOMContentLoaded', () => {
  document.querySelector('.navbar').classList.add('hidden');
});
  
  // Play background music
  function playMusic() {
    bgMusic.volume = 0.3;
    bgMusic.play().catch(err => {
      console.log("Audio playback requires user interaction");
    });
  }
  
  // Toggle between 2D and 3D views
  function toggleView() {
    is3DView = !is3DView;
    
    if (is3DView) {
      solarSystem.classList.add('three-d');
      viewToggle.textContent = '2D View';
      
      // Add 3D perspective
      document.body.style.perspective = '1000px';
      
      // Force reflow to ensure 3D transforms apply correctly
      void solarSystem.offsetWidth;
    } else {
      solarSystem.classList.remove('three-d');
      viewToggle.textContent = '3D View';
      
      // Reset perspective
      document.body.style.perspective = 'none';
    }
  }
  
  // Show about information
  function showAbout() {
    alert("Solar System Visualization\nCreated by Rishabh\n\nThis interactive model shows our solar system with accurate relative sizes and orbits.\nToggle between 2D and 3D views for different perspectives!");
  }
  
  // Show planet information
  function showPlanetInfo() {
    const planetInfo = `
      Planet Information:
      
      Mercury: Closest to the Sun, smallest planet
      Venus: Hottest planet, thick atmosphere
      Earth: Our home, only known life
      Mars: The Red Planet, potential for life
      Jupiter: Largest planet, gas giant
      Saturn: Famous for its rings
      Uranus: Rotates on its side
      Neptune: Windiest planet
      Pluto: Dwarf planet (controversial!)
    `;
    alert(planetInfo);
  }
  
  // Show distances page
  function showDistances() {
    return true;
  }
  
  // Handle window resize for responsive design
  function handleResize() {
    // Reset the view on resize to prevent layout issues
    if (is3DView) {
      solarSystem.classList.remove('three-d');
      setTimeout(() => {
        solarSystem.classList.add('three-d');
      }, 10);
    }
  }
  
  // Mobile touch controls
  let touchStartX = 0;
  let touchEndX = 0;
  
  function handleSwipe() {
    const threshold = 50; // Minimum swipe distance
    
    if (touchEndX < touchStartX - threshold) {
      // Swipe left - enable 3D view if not already
      if (!is3DView) {
        toggleView();
      }
    } else if (touchEndX > touchStartX + threshold) {
      // Swipe right - disable 3D view if active
      if (is3DView) {
        toggleView();
      }
    }
  }
  
  // Event Listeners
  document.addEventListener('DOMContentLoaded', () => {
    createStars();
    document.getElementById('main-content').style.display = 'none';
    
    // Enable music playback on any user interaction
    document.body.addEventListener('click', () => {
      if (!musicPlaying) {
        bgMusic.volume = 0.3;
        bgMusic.play()
          .then(() => {
            musicPlaying = true;
          })
          .catch(error => {
            console.log("Music playback requires user interaction");
          });
      }
    });
    
    // Keyboard controls for accessibility
    document.addEventListener('keydown', (e) => {
      if (e.code === 'Space') {
        toggleView();
      }
    });
    
    // Touch events for mobile
    document.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, false);
  
    document.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    }, false);
    
    // Window resize handler
    window.addEventListener('resize', handleResize);
  });

  // Ensure navbar starts hidden
window.addEventListener('DOMContentLoaded', () => {
  document.querySelector('.navbar').classList.add('hidden');
});


