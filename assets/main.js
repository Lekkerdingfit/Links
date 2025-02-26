// Wish to make Rotated cube with random linked media from arena,
// rotated cube with random image from API is the most hardest part
// I found this tools: CHAT GPT an https://labex.io/tutorials/css-3d-rotating-cube-165641,d
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

// I want to make pop-up modeal for channel-description
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

// Javascript to know about my buttons and ElementInternals
let channelBlocks = document.querySelector('#channel-blocks')
let showVideoButton = document.querySelector('#show-video-button')
let showImageButton = document.querySelector('#show-image-button')
let showTextButton = document.querySelector('#show-text-button')
let showLinkButton = document.querySelector('#show-link-button')
let showAudioButton = document.querySelector('#show-audio-button')
let showAllButton = document.querySelector('#show-all-button')


// Add onclick for my buttons
// I found the tool from our Dev mode and other folk's help
// easy to understnad the logic add and remove

showVideoButton.onclick = () => {
	// When I click show videos, it should add show-video class
	channelBlocks.classList.remove('show-video', 'show-image', 'show-text', 'show-link', 'show-audio');
	channelBlocks.classList.add('show-video')
}

showImageButton.onclick = () => {
	channelBlocks.classList.remove('show-video', 'show-image', 'show-text', 'show-link', 'show-audio');
	channelBlocks.classList.add('show-image')
}

showTextButton.onclick = () => {
	channelBlocks.classList.remove('show-video', 'show-image', 'show-text', 'show-link', 'show-audio');
	channelBlocks.classList.add('show-text')
}

showLinkButton.onclick = () => {
	channelBlocks.classList.remove('show-video', 'show-image', 'show-text', 'show-link', 'show-audio');
	channelBlocks.classList.add('show-link')
}

showAudioButton.onclick = () => {
	channelBlocks.classList.remove('show-video', 'show-image', 'show-text', 'show-link', 'show-audio');
	channelBlocks.classList.add('show-audio')
}

showAllButton.onclick = () => {
	// When I click show all, it should remove show-video class
	channelBlocks.classList.remove('show-video', 'show-image', 'show-text', 'show-link', 'show-audio');
}

