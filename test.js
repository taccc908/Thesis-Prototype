const modal = document.getElementById('videoModal');
const videoContainer = document.querySelector('.video-modal-content');
const video = document.getElementById('popupVideo');

document.addEventListener('pointerdown', (event) => {
    // Only if modal is closed
    if (modal.style.display !== 'block') {

        // Show modal first — must be visible BEFORE play()
        modal.style.display = 'block';

        // Position video container at tap
        const clickX = event.clientX;
        const clickY = event.clientY;
        videoContainer.style.left = `${clickX}px`;
        videoContainer.style.top = `${clickY}px`;
        videoContainer.style.transform = 'translate(-50%, -50%)';

        // iOS rules: playsInline and muted=false
        video.playsInline = true;
        video.muted = false;
        video.currentTime = 0;

        // IMPORTANT: Play video DIRECTLY inside pointerdown event
        const playPromise = video.play();
        if (playPromise !== undefined) {
            playPromise.catch(err => {
                console.log("iPad/iPhone blocked playback, user must tap again.", err);
            });
        }
    }
});

// Close modal when video ends
video.addEventListener('ended', () => {
    video.pause();
    video.currentTime = 0;
    modal.style.display = 'none';
});
