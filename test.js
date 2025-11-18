// Get HTML elements
const openBtn = document.getElementById('openVideoBtn');
const modal = document.getElementById('videoModal');
const closeBtn = document.getElementById('closeModalBtn');
const video = document.getElementById('popupVideo');

// Open modal + play video
openBtn.addEventListener('click', () => {
  modal.style.display = 'block';
  // Reset video to start (optional)
  video.currentTime = 0;
  video.play();
});

// Close modal when "X" clicked
closeBtn.addEventListener('click', () => {
  closeModal();
});

// Also, close when video ends
video.addEventListener('ended', () => {
  closeModal();
});

// Close modal function
function closeModal() {
  video.pause();
  video.currentTime = 0; // reset
  modal.style.display = 'none';
}

// Optional: Click outside the video content to close modal
window.addEventListener('click', (event) => {
  if (event.target === modal) {
    closeModal();
  }
});