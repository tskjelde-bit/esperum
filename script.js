document.addEventListener('DOMContentLoaded', function () {
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

        // Attempt autoplay immediately
        bgMusic.volume = 0.5;
        const playPromise = bgMusic.play();

        if (playPromise !== undefined) {
            playPromise.then(_ => {
                isPlaying = true;
                soundToggle.textContent = '🔊';
            }).catch(error => {
                console.log("Autoplay blocked. Waiting for interaction.");
                soundToggle.textContent = '🔇';
                isPlaying = false;

                // Add one-time listener to play on ANY interaction
                const enableAudio = () => {
                    bgMusic.play().then(() => {
                        isPlaying = true;
                        soundToggle.textContent = '🔊';
                        // Remove listeners once playing
                        document.removeEventListener('click', enableAudio);
                        document.removeEventListener('keydown', enableAudio);
                        document.removeEventListener('touchstart', enableAudio);
                    });
                };

                document.addEventListener('click', enableAudio);
                document.addEventListener('keydown', enableAudio);
                document.addEventListener('touchstart', enableAudio);
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

    // Spawn Icon Swarm
    function spawnSwarm() {
        // Only run on landing page (check for hero section)
        if (!document.querySelector('.hero')) return;

        const count = 15;
        const body = document.body;

        for (let i = 0; i < count; i++) {
            const wrapper = document.createElement('div');
            wrapper.className = 'swarm-unit-wrapper';

            const inner = document.createElement('div');
            inner.className = 'swarm-unit-inner';

            const img = document.createElement('img');
            img.src = 'clean.svg';
            img.className = 'swarm-icon';
            img.alt = '';

            // Randomize Speeds (Base ~6-8s for double speed, X and Y independent)
            const durationX = 5 + Math.random() * 5; // 5s to 10s
            const durationY = 6 + Math.random() * 6; // 6s to 12s
            const delay = Math.random() * 5; // Start scattering over 5s

            // Randomize Y start slightly
            const startY = Math.random() * 80; // 0-80vh start

            wrapper.style.animationDuration = `${durationX}s`;
            wrapper.style.animationDelay = `${delay}s`;

            inner.style.animationDuration = `${durationY}s`;
            inner.style.animationDelay = `${delay}s`; /* Sync start time */
            inner.style.top = `${startY}vh`;

            inner.appendChild(img);
            wrapper.appendChild(inner);
            body.appendChild(wrapper);
        }
    }

    spawnSwarm();
});
