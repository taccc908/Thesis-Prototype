const modal = document.getElementById('videoModal');
const videoContainer = document.querySelector('.video-modal-content');
const video = document.getElementById('popupVideo');
const caption = document.getElementById("video-caption");

document.addEventListener('pointerdown', (event) => {
    if (modal.style.display !== 'block') {

        // Position modal container
        const clickX = event.clientX;
        const clickY = event.clientY;
        videoContainer.style.left = `${clickX}px`;
        videoContainer.style.top = `${clickY}px`;
        videoContainer.style.transform = 'translate(-50%, -50%)';

        // Make modal visible BEFORE playing
        modal.style.display = 'block';

        // Show caption immediately (opacity = 1 is optional for fade)
        caption.style.display = 'block';
        requestAnimationFrame(() => {
            caption.style.opacity = 1;
        });

        // iOS playback rules
        video.muted = false;
        video.playsInline = true;
        video.currentTime = 0;

        // Force a short delay to ensure the video is rendered in DOM
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
    caption.style.opacity = 0;
    setTimeout(() => {
        caption.style.display = 'none';
    }, 400);
}
