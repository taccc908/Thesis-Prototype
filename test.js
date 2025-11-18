const modal = document.getElementById('videoModal');
const video = document.getElementById('popupVideo');

// Play video when clicking ANYWHERE on the page
document.addEventListener('click', () => {
  // Only trigger if modal is not already open
  if (modal.style.display !== 'block') {
    modal.style.display = 'block';
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
