// Load Markdown-it 
let markdownIt = document.createElement("script");
markdownIt.src = "https://cdn.jsdelivr.net/npm/markdown-it@14.0.0/dist/markdown-it.min.js";
document.head.appendChild(markdownIt);

// Are.na channel settings
let channelSlug = "stay-creative";
let images = []; // List of images retrieved from the API
let imageIndex = 0; // Index of the current image to apply
let lastUpdateTime = 0; // Last update timestamp
const updateInterval = 1500; // Image change interval(1.5seconds)

// Function to update channel information
function placeChannelInfo(data) {
    let channelTitle = document.querySelector("#channel-title");
    let channelDescription = document.querySelector("#channel-description");
    let channelCount = document.querySelector("#channel-count");
    let channelLink = document.querySelector("#channel-link");

    channelTitle.innerHTML = data.title;
    channelDescription.innerHTML = window.markdownit().render(data.metadata.description);
    channelCount.innerHTML = data.length;
    channelLink.href = `https://www.are.na/channel/${channelSlug}`;
}
//Function to render blocks retrieved from the API
function renderBlock(block) {
    let channelBlocks = document.querySelector("#channel-blocks");

    if (block.class === "Link") {
        let linkItem = `
            <li>
                <picture>
                    <img src="${block.image.original.url}" alt="${block.title}">
                </picture>
                <h3>${block.title}</h3>
                ${block.description_html}
                <p><a href="${block.source.url}">See the original ↗</a></p>
            </li>
        `;
        channelBlocks.insertAdjacentHTML("beforeend", linkItem);
    } else if (block.class === "Image") {
        let imageItem = `
            <li>
			<h3>${ block.title || 'Image'}</h3>
			<img class="image-box" src="${block.image.original.url}" alt=""></li>
        `;
        channelBlocks.insertAdjacentHTML("beforeend", imageItem);
    } else if (block.class === "Text") {
        let textItem = `
            <p class="text-box">${block.content_html}</p>
             <p class="text-created"> Created on ${block.created_at}</p>`;
        channelBlocks.insertAdjacentHTML("beforeend", textItem);
    } else if (block.class === "Attachment") {
        let attachment = block.attachment.content_type;
        if (attachment.includes("video")) {
            let videoItem = `
                <li>
                    <h3>${ block.title || 'video'}</h3>
                    <video class="video-box" controls src="${block.attachment.url}"></video>
					
                </li>
            `;
            channelBlocks.insertAdjacentHTML("beforeend", videoItem);
        } else if (attachment.includes("audio")) {
            let audioItem = `
                <li>
                    <h3>${ block.title || 'audio'}</h3>
                    <audio class ="audio-box" controls src="${block.attachment.url}"></audio>
                </li>
            `;
            channelBlocks.insertAdjacentHTML("beforeend", audioItem);
        }
    } else if (block.class === "Media") {
        let embed = block.embed.type;
        if (embed.includes("video")) {
            let linkedVideoItem = `
                <li>
                    <h3>${ block.title || 'Media'}</h3>
                    <div class="linkedvideo-box">${block.embed.html}</div>
                </li>
            `;
            channelBlocks.insertAdjacentHTML("beforeend", linkedVideoItem);
        }
    }
}

// Fetch API data
fetch(`https://api.are.na/v2/channels/${channelSlug}?per=100`, { cache: "no-store" })
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        placeChannelInfo(data);

        // Store image list(to be used in the cube)
        images = data.contents
            .filter((block) => block.class === "Image" || block.class === "Media")
            .map((block) => block.image ? block.image.original.url : block.embed.html);

        // Set initial cube images
        updateCubeFaces();

        // Render block data
        data.contents.reverse().forEach((block, index) => {
            renderBlock(block);
            if (index < 6) {
                updateCubeFaces();
            }
        });

        // Render user information
        let channelUsers = document.querySelector("#channel-users");
        data.collaborators.forEach((collaborator) => renderUser(collaborator, channelUsers));
        renderUser(data.user, channelUsers);
    });


// Function to render user information
function renderUser(user, container) {
    let userAddress = `
        <address>
            <img src="${user.avatar_image.display}" alt="${user.first_name}">
            <h3>${user.first_name}</h3>
            <p><a href="https://are.na/${user.slug}">Are.na profile ↗</a></p>
        </address>
    `;
    container.insertAdjacentHTML("beforeend", userAddress);
}