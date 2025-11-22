const modal = document.getElementById('videoModal');

// GIF sources to alternate
let useFirstGif = true;
const gifA = "Video/Neuron3.gif";
const gifB = "Video/Neuron9.gif";

// Duration to display each GIF (ms)
const GIF_DURATION = 2000; // adjust based on your GIF length

// Listen for taps on desktop and iPad/iPhone
document.addEventListener('click', handleTap);
document.addEventListener('touchstart', handleTap, { passive: false });

function handleTap(event) {
    // Prevent iOS double-firing
    if (event.type === 'touchstart') event.preventDefault();

    const x = (event.clientX !== undefined) ? event.clientX :
              (event.touches && event.touches[0] && event.touches[0].clientX) || window.innerWidth/2;
    const y = (event.clientY !== undefined) ? event.clientY :
              (event.touches && event.touches[0] && event.touches[0].clientY) || window.innerHeight/2;

    // Pick GIF source and alternate
    const src = useFirstGif ? gifA : gifB;
    useFirstGif = !useFirstGif;

    // Create new IMG element for the GIF
    const newGif = document.createElement('img');
    newGif.src = src;
    newGif.style.position = 'absolute';
    newGif.style.left = `${x}px`;
    newGif.style.top = `${y}px`;
    newGif.style.transform = 'translate(-50%, -50%)';
    newGif.style.pointerEvents = 'none'; // so taps pass through
    newGif.style.maxWidth = '80vw';
    newGif.style.height = 'auto';

    // Add GIF to modal
    modal.appendChild(newGif);
    modal.style.display = 'block';

    // Remove GIF after duration
    setTimeout(() => {
        newGif.remove();
        // Hide modal if no GIFs left
        if (modal.querySelectorAll('img').length === 0) {
            modal.style.display = 'none';
        }
    }, GIF_DURATION);
}
