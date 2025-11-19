const modal = document.getElementById('videoModal');
const videoContainer = document.querySelector('.video-modal-content');
const video = document.getElementById('popupVideo');
const caption = document.getElementById("video-caption");

document.addEventListener('pointerdown', (event) => {
    // Only open if modal is closed
    if (modal.style.display !== 'block') {
        const clickX = event.clientX;
        const clickY = event.clientY;

        // Show modal and position video container IMMEDIATELY
        modal.style.display = 'block';
        videoContainer.style.left = `${clickX}px`;
        videoContainer.style.top = `${clickY}px`;
        videoContainer.style.transform = 'translate(-50%, -50%)';

        // iOS/iPad playback rules
        video.muted = false;
        video.playsInline = true;
        video.currentTime = 0;

        // Play video DIRECTLY after making it visible
        const playPromise = video.play();
        if (playPromise !== undefined) {
            playPromise.catch(err => {
                console.log("Playback prevented, tap again.", err);
            });
        }

        // Show caption with fade-in AFTER video starts
        caption.style.display = 'block';
        requestAnimationFrame(() => {
            caption.style.opacity = 1;
        });
    }
});

// Close modal when video ends
video.addEventListener('ended', () => {
    closeModal();
});

function closeModal() {
    video.pause();
    video.currentTime = 0;
    modal.style.display = 'none';

    // Fade out caption
    caption.style.opacity = 0;
    setTimeout(() => {
        caption.style.display = 'none';
    }, 400);
}
