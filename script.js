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
});
