const modal = document.getElementById('videoModal');
const videoContainer = document.querySelector('.video-modal-content');
const video = document.getElementById('popupVideo');

// Play video and position it where the user clicked
document.addEventListener('click', (event) => {

  // Only trigger if modal is not already open
  if (modal.style.display !== 'block') {
    const clickX = event.clientX;
    const clickY = event.clientY;

    modal.style.display = 'block';

    // Position the video container at click location
    videoContainer.style.position = 'absolute';
    videoContainer.style.left = `${clickX}px`;
    videoContainer.style.top = `${clickY}px`;

    video.currentTime = 0;
    video.play();
  }
});

// Close modal when video ends
video.addEventListener('ended', () => {
  closeModal();
});

// Close modal if clicking outside the video
window.addEventListener('click', (event) => {
  if (event.target === modal) {
    closeModal();
  }
});

function closeModal() {
  video.pause();
  video.currentTime = 0;
  modal.style.display = 'none';
}
