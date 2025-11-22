const modal = document.getElementById('videoModal');
const videoContainer = document.querySelector('.video-modal-content');

// Alternate between videos
let useFirstVideo = true;
const videoA = "Video/Neuron3.mov";
const videoB = "Video/Neuron9.mov";

// Tap on both desktop + iOS
document.addEventListener('click', handleTap);
document.addEventListener('touchstart', handleTap);

function handleTap(event) {
    // Prevent double touch on iOS
    if (event.type === "touchstart") {
        event.preventDefault();
    }

    const x = event.clientX || event.touches?.[0].clientX;
    const y = event.clientY || event.touches?.[0].clientY;

    // Always choose and flip video source
    const src = useFirstVideo ? videoA : videoB;
    useFirstVideo = !useFirstVideo;

    // Create a NEW video element each tap
    const newVideo = document.createElement('video');
    newVideo.src = src;
    newVideo.width = 640;
    newVideo.playsInline = true;
    newVideo.muted = true; // iOS requirement for autoplay
    newVideo.style.position = "absolute";
    newVideo.style.left = `${x}px`;
    newVideo.style.top = `${y}px`;
    newVideo.style.transform = "translate(-50%, -50%)";

    // Add it to the modal
    modal.appendChild(newVideo);
    modal.style.display = "block";

    // Force iOS to load before play
    newVideo.load();

    newVideo.play().then(() => {
        newVideo.muted = false;
    }).catch(err => {
        console.log("Playback blocked:", err);
    });

    // After video ends, remove only THIS video
    newVideo.addEventListener('ended', () => {
        newVideo.remove();

        // If no videos left, hide the modal
        if (modal.querySelectorAll("video").length === 0) {
            modal.style.display = "none";
        }
    });
}
