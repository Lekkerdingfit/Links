// Wish to make Rotated cube with random linked media from arena,
//Function to update each face of the cube
function updateCubeFaces() {
    const cubeFaces = ["front", "back", "right", "left", "top", "bottom"];
    
    cubeFaces.forEach((face) => {
        if (images.length > 0) {
            const randomIndex = Math.floor(Math.random() * images.length);
            const imgSrc = images[randomIndex];
            const faceElement = document.querySelector(`#${face}`);
            faceElement.style.backgroundImage = `url(${imgSrc})`;
			faceElement.style.backgroundSize = "cover";

        }
    });
}

setInterval(updateCubeFaces, updateInterval);

//https://developer.mozilla.org/en-US/docs/Web/CSS/::backdrop
// modal open and close- not easy to understand

document.addEventListener('DOMContentLoaded', () => {
    const creativeButton = document.getElementById('creative-button');
    const openCreative = document.getElementById('open-creative');
    const channelDescription = document.getElementById('channel-description');
    const yesCreative = document.getElementById('yes-creative');

    creativeButton.addEventListener('click', () => {
        channelDescription.textContent = "Creativity is about thinking beyond the ordinary, breaking boundaries, and finding new ways to express ideas.";
        openCreative.showModal();  // open modal
    });

    yesCreative.addEventListener('click', () => {
        openCreative.close();  // close modal
    });
});

