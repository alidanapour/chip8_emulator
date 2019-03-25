let scalingFactor = 20;         		// Scale pixels by this factor

let spriteEditorArea = document.getElementById('sprite-draw');
let spriteLength = 15;
let spriteWidth = 8;
let numberOfPixels = spriteLength * spriteWidth;

spriteEditorArea.onmousedown = updateSpriteArea;
spriteEditorArea.onmousemove = updateSpriteArea;
spriteEditorArea.oncontextmenu = () => false;   // Disable right click within the sprite editor area

let pixelArray = new Array(numberOfPixels);     // Array to store sprite pixels

function clearSpriteArea() {
    const ctx = spriteEditorArea.getContext('2d');
    ctx.fillStyle = 'lightslategrey';
    ctx.fillRect(0, 0, spriteEditorArea.width, spriteEditorArea.height);
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

let spriteText = document.getElementById('sprite-output');
// spriteText.value = "0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00";
spriteText.value = "00";

function renderSpriteScreenFromText() {
    let valueToConvert = spriteText.value.toString(2);
    const ctx = spriteEditorArea.getContext("2d");
    ctx.fillStyle = "black";
    ctx.clearRect(0, 0, spriteEditorArea.width, spriteEditorArea.height);
    for (let y = 0; y < this.screenHeight; y++) {
        for (let x = 0; x < this.screenWidth; x++) {
            if (this.display[x + (y * this.screenWidth)])
                screen.fillRect(x * scalingFactor, y * scalingFactor, scalingFactor, scalingFactor);
        }
    }
}