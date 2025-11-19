const modal = document.getElementById('videoModal');
const videoContainer = document.querySelector('.video-modal-content');
const video = document.getElementById('popupVideo');
const caption = document.getElementById("video-caption");

// Play video and position it where the user tapped
document.addEventListener('pointerdown', (event) => {
  
  // Only trigger if modal is not already open
  if (modal.style.display !== 'block') {
    const clickX = event.clientX;
    const clickY = event.clientY;

    modal.style.display = 'block';

    // Position the modal container at the tap point
    videoContainer.style.left = `${clickX}px`;
    videoContainer.style.top = `${clickY}px`;
    videoContainer.style.transform = "translate(-50%, -50%)";

    caption.style.display = "block";
    requestAnimationFrame(() => caption.style.opacity = 1);

    // iPad/iPhone autoplay rules
    video.muted = false;            // allow sound
    video.playsInline = true;       // required for iOS popup video
    video.currentTime = 0;
    video.play().catch(() => {
      // If iOS blocks autoplay, tap again will play
      console.log("Autoplay blocked, user must tap again.", err);
    });
  }
});

// Close ONLY when video ends
video.addEventListener('ended', () => {
  closeModal();
});

// Explicit close function
function closeModal() {
  video.pause();
  video.currentTime = 0;
  modal.style.display = 'none';
  caption.style.opacity = 0;
  setTimeout(() => {
    caption.style.display = "none";
  }, 400);
}
