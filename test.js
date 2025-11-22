let tapLocked = false;

const modal = document.getElementById('videoModal');

// GIF sources to alternate
let useFirstGif = true;
const gifA = "Video/Neuron3.gif";
const gifB = "Video/Neuron9.gif";

// Duration for each GIF in milliseconds
const gifDurations = {
  [gifA]: 2000, // Neuron3.gif
  [gifB]: 1440  // Neuron9.gif
};

// Listen for taps on desktop and iPad/iPhone
document.addEventListener('click', handleTap);
document.addEventListener('touchstart', handleTap, { passive: false });

function freshGif(src) {
    return src + "?t=" + Date.now();
}

function handleTap(event) {
    // Prevent double handling
    if (tapLocked) return;
    tapLocked = true;
    setTimeout(() => tapLocked = false, 250); // adjust if needed

    if (event.type === 'touchstart') event.preventDefault();

    const x = (event.clientX !== undefined) ? event.clientX :
              (event.touches && event.touches[0] && event.touches[0].clientX) || window.innerWidth/2;
    const y = (event.clientY !== undefined) ? event.clientY :
              (event.touches && event.touches[0] && event.touches[0].clientY) || window.innerHeight/2;

    const rawSrc = useFirstGif ? gifA : gifB;
    useFirstGif = !useFirstGif;

    const newGif = document.createElement('img');
    newGif.src = freshGif(rawSrc);  // ← using your reset fix
    newGif.style.position = 'absolute';
    newGif.style.left = `${x}px`;
    newGif.style.top = `${y}px`;
    newGif.style.transform = 'translate(-50%, -50%)';
    newGif.style.pointerEvents = 'none';
    newGif.style.maxWidth = '80vw';
    newGif.style.height = 'auto';

    modal.appendChild(newGif);
    modal.style.display = 'block';

    const duration = gifDurations[rawSrc] || 2000;
    setTimeout(() => {
        newGif.remove();
        if (modal.querySelectorAll('img').length === 0) {
            modal.style.display = 'none';
        }
    }, duration);
}
