const modal = document.getElementById('videoModal');
const videoContainer = document.querySelector('.video-modal-content');
const video = document.getElementById('popupVideo');

document.addEventListener('pointerdown', (event) => {
    if (modal.style.display !== 'block') {

        // Position modal container at tap/click
        const clickX = event.clientX;
        const clickY = event.clientY;
        videoContainer.style.left = `${clickX}px`;
        videoContainer.style.top = `${clickY}px`;
        videoContainer.style.transform = 'translate(-50%, -50%)';

        // Show modal
        modal.style.display = 'block';

        // iOS/iPad playback rules
        video.muted = false;
        video.playsInline = true;
        video.currentTime = 0;

        // Ensure video is rendered before playback
        setTimeout(() => {
            const playPromise = video.play();
            if (playPromise !== undefined) {
                playPromise.catch(err => {
                    console.log("Playback prevented, user must tap again.", err);
                });
            }
        }, 0);
    }
});

// Close modal when video ends
video.addEventListener('ended', closeModal);

function closeModal() {
    video.pause();
    video.currentTime = 0;
    modal.style.display = 'none';
}
