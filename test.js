const modal = document.getElementById('videoModal');
const videoContainer = document.querySelector('.video-modal-content');
const video = document.getElementById('popupVideo');
const caption = document.getElementById("video-caption");

// Play video at tap location
document.addEventListener('pointerdown', (event) => {
    // Only open if modal is closed
    if (modal.style.display !== 'block') {
        const clickX = event.clientX;
        const clickY = event.clientY;

        // Show modal and position video container
        modal.style.display = 'block';
        videoContainer.style.left = `${clickX}px`;
        videoContainer.style.top = `${clickY}px`;
        videoContainer.style.transform = 'translate(-50%, -50%)';

        // Show caption
        caption.style.display = 'block';
        requestAnimationFrame(() => {
            caption.style.opacity = 1; // fade in
        });

        // iOS/iPad rules: must play in direct user gesture
        video.muted = false;
        video.playsInline = true;
        video.currentTime = 0;

        // Play video directly
        video.play().catch(err => {
            console.log("Autoplay blocked, tap again.", err);
        });
    }
});

// Close modal when video ends
video.addEventListener('ended', () => {
    closeModal();
});

// Close modal function
function closeModal() {
    video.pause();
    video.currentTime = 0;
    modal.style.display = 'none';

    // Hide caption with fade-out
    caption.style.opacity = 0;
    setTimeout(() => {
        caption.style.display = 'none';
    }, 400); // matches transition
}
