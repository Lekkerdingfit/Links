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








