let scalingFactor = 20;         		// Scale pixels by this factor

let spriteEditorArea = document.getElementById('sprite-draw');
let spriteLength = 15;
let spriteWidth = 8;
let numberOfPixels = spriteLength * spriteWidth;
let spriteText = document.getElementById('sprite-output');
spriteText.value = "0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00";

spriteEditorArea.onmousedown = updateSpriteArea;
spriteEditorArea.onmousemove = updateSpriteArea;
spriteEditorArea.oncontextmenu = () => false;       // Disable right click within the sprite editor area
spriteText.oninput = renderSpriteScreenFromText;

let pixelArray = [0x00, 0x00, 0x00, 0x00, 0x00,
                  0x00, 0x00, 0x00, 0x00, 0x00, 
                  0x00, 0x00, 0x00, 0x00, 0x00];    // Array to store sprite pixels

function toHexString(byteArray) {
    let str = [];
    for (let i = 0; i < byteArray.length; i++)
        str.push('0x' + byteArray[i].toString(16).padStart(2, '0').toUpperCase());
    return str.join(', ');
}

function clearSpriteArea() {
    const ctx = spriteEditorArea.getContext('2d');
    ctx.fillStyle = '#c4c4c4';
    ctx.fillRect(0, 0, spriteEditorArea.width, spriteEditorArea.height);
    spriteText.value = "0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00";
    pixelArray = [0x00, 0x00, 0x00, 0x00, 0x00, 
                  0x00, 0x00, 0x00, 0x00, 0x00, 
                  0x00, 0x00, 0x00, 0x00, 0x00];
}

function updateSpriteArea(e) {
    if (e.buttons == 1) {                           // If left click is pressed
        const ctx = spriteEditorArea.getContext('2d');
        ctx.fillStyle = 'black';
        ctx.fillRect(Math.floor(e.offsetX / scalingFactor) * scalingFactor,
                    Math.floor(e.offsetY / scalingFactor) * scalingFactor,
                    scalingFactor,
                    scalingFactor);
        pixelArray[Math.floor(e.offsetY / scalingFactor)] |= (0b10000000 >>> Math.floor(e.offsetX / scalingFactor));
    }

    else if (e.buttons == 2) {                  // If right click is pressed
        const ctx = spriteEditorArea.getContext('2d');
        ctx.fillStyle = '#c4c4c4';
        ctx.fillRect(Math.floor(e.offsetX / scalingFactor) * scalingFactor,
                    Math.floor(e.offsetY / scalingFactor) * scalingFactor,
                    scalingFactor,
                    scalingFactor);
        pixelArray[Math.floor(e.offsetY / scalingFactor)] &= ~(0b10000000 >> Math.floor(e.offsetX / scalingFactor));
    }

    spriteText.value = toHexString(pixelArray);
}

function renderSpriteScreenFromText() {
    let valueToConvert = spriteText.value.split(' ');
    for (let i = 0; i < valueToConvert.length; i++) {
        valueToConvert[i] = parseInt(valueToConvert[i].trim());
        pixelArray[i] = valueToConvert[i];
    }
    
    const ctx = spriteEditorArea.getContext("2d");
    ctx.fillStyle = "#c4c4c4";
    ctx.clearRect(0, 0, spriteEditorArea.width, spriteEditorArea.height);

    for (let y = 0; y < valueToConvert.length; y++) {
        for (let x = 0; x < 8; x++) {
            if (valueToConvert[y] & (0b10000000 >>> x)) {
                console.log(pixelArray[y] & (0b10000000 >>> x))
                ctx.fillStyle = "black";
                ctx.fillRect(x * scalingFactor, y * scalingFactor, scalingFactor, scalingFactor);
            }
        }
    }
}