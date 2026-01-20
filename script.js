document.addEventListener('DOMContentLoaded', function() {
    // Background Music Logic
    const bgMusic = document.getElementById('bg-music');
    const soundToggle = document.getElementById('sound-toggle');
    
    if (bgMusic && soundToggle) {
        let isPlaying = false;

        // Try to verify if autoplay worked (it usually doesn't with sound)
        // We start with the assumption it might be paused.
        
        const toggleSound = () => {
            if (isPlaying) {
                bgMusic.pause();
                soundToggle.textContent = '🔇';
                isPlaying = false;
            } else {
                bgMusic.play().then(() => {
                    soundToggle.textContent = '🔊';
                    isPlaying = true;
                }).catch(e => {
                    console.log("Audio playback failed:", e);
                });
            }
        };

        soundToggle.addEventListener('click', toggleSound);

        // Attempt autoplay on load
        bgMusic.volume = 0.5; // Start at 50% volume
        const playPromise = bgMusic.play();

        if (playPromise !== undefined) {
            playPromise.then(_ => {
                // Autoplay started!
                isPlaying = true;
                soundToggle.textContent = '🔊';
            }).catch(error => {
                // Auto-play was prevented
                // Show UI to let user play manually
                console.log("Autoplay prevented by browser.");
                soundToggle.textContent = '🔇';
                isPlaying = false;
            });
        }
    }

    // Toggle Mobile Menu
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const navList = document.querySelector('.nav-list');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navList.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }
});
