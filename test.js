const modal = document.getElementById('videoModal');
const videoContainer = document.querySelector('.video-modal-content');
const video = document.getElementById('popupVideo');

document.addEventListener('click', (event) => {
    if (modal.style.display !== 'block') {
        // Position video at click
        const clickX = event.clientX;
        const clickY = event.clientY;
        videoContainer.style.left = `${clickX}px`;
        videoContainer.style.top = `${clickY}px`;
        videoContainer.style.transform = 'translate(-50%, -50%)';

        // Show modal
        modal.style.display = 'block';

        // Reset video
        video.currentTime = 0;
        video.muted = true; // avoids iOS block
        video.playsInline = true;

        // Play video
        video.play().then(() => {
            video.muted = false; // unmute after playback starts
        }).catch(err => {
            console.log("Playback blocked:", err);
        });
    }
});

video.addEventListener('ended', () => {
    video.pause();
    video.currentTime = 0;
    modal.style.display = 'none';
});
