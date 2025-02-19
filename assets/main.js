// Wish to make Rotated cube with random linked media from arena,
//Function to update each face of the cube
function updateCubeFaces() {
    const cubeFaces = ["front", "back", "right", "left", "top", "bottom"];
    
    cubeFaces.forEach((face, index) => {
        const faceElement = document.querySelector(`#${face}`);
        const imgSrc = images[(imageIndex + index) % images.length]; // 각 면에 다른 이미지 적용
        faceElement.style.backgroundImage = `url(${imgSrc})`;
        faceElement.style.backgroundSize = "cover";
        faceElement.style.backgroundPosition = "center";
    });
}

// Detect scroll events to change cube images(with debounce)
window.addEventListener("scroll", () => {
    const now = Date.now();
    if (now - lastUpdateTime > updateInterval) {
        imageIndex = (imageIndex + 1) % images.length;
        updateCubeFaces();
        lastUpdateTime = now;
    }
});






