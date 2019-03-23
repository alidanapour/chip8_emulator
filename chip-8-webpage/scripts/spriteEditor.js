let scalingFactor = 20;         		// Scale pixels by this factor

let spriteEditorArea = document.getElementById('sprite-draw');
let spriteLength = 15;
let spriteWidth = 8;
let numberOfPixels = spriteLength * spriteWidth;

spriteEditorArea.onmousedown = updateSpriteArea;
spriteEditorArea.onmousemove = updateSpriteArea;
spriteEditorArea.oncontextmenu = () => false;   // Disable right click within the canvas

let pixelArray = new Array(numberOfPixels);     // Array to store sprite pixels

function clearSpriteArea() {
    const ctx = spriteEditorArea.getContext('2d');
    ctx.fillStyle = 'lightslategrey';
    ctx.fillRect(0, 0, spriteEditorArea.clientWidth, spriteEditorArea.height);
}

function updateSpriteArea(e) {
    if (e.buttons == 1) {                       // If left click is pressed
        const ctx = spriteEditorArea.getContext('2d');
        ctx.fillStyle = 'black';
        ctx.fillRect(Math.floor(e.offsetX / scalingFactor) * scalingFactor,
                    Math.floor(e.offsetY / scalingFactor) * scalingFactor,
                    scalingFactor,
                    scalingFactor);
    }

    else if (e.buttons == 2) {                  // If right click is pressed
        const ctx = spriteEditorArea.getContext('2d');
        ctx.fillStyle = 'lightslategrey';
        ctx.fillRect(Math.floor(e.offsetX / scalingFactor) * scalingFactor,
                    Math.floor(e.offsetY / scalingFactor) * scalingFactor,
                    scalingFactor,
                    scalingFactor);
    }
}