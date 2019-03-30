const scalingFactor = 20;         		// Scale pixels by this factor

const spriteEditorArea = document.getElementById('sprite-draw');
const spriteLength = 15;
const spriteWidth = 8;
let numberOfPixels = spriteLength * spriteWidth;

const spriteTextBox = document.getElementById('sprite-output');
spriteTextBox.value = "0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00";

spriteEditorArea.onmousedown = updateSpriteArea;
spriteEditorArea.onmousemove = updateSpriteArea;
spriteEditorArea.oncontextmenu = () => false;       // Disable right click within the sprite editor area
spriteTextBox.oninput = renderSpriteScreenFromText;

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
    spriteTextBox.value = "0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00";
    pixelArray = [0x00, 0x00, 0x00, 0x00, 0x00, 
                  0x00, 0x00, 0x00, 0x00, 0x00, 
                  0x00, 0x00, 0x00, 0x00, 0x00];
}

function moveSpriteUp() {
    const tempTopByte = pixelArray[0];                // Store the top most line
    pixelArray.shift();                             // Remove the top most line
    pixelArray.push(tempTopByte);                   // Push the line stored to the end
    spriteTextBox.value = toHexString(pixelArray);
    renderSpriteScreenFromText();
}

function moveSpriteDown() {
    const tempBottomByte = pixelArray.pop();          // Remove and store the bottom line
    pixelArray.unshift(tempBottomByte);             // Push the line stored to the front
    spriteTextBox.value = toHexString(pixelArray);
    renderSpriteScreenFromText();
}

function moveSpriteLeft() {
    for (let i = 0; i < pixelArray.length; i++) {
        let currentByte = pixelArray[i];
        let firstBit = (currentByte & 0b10000000) ? 1 : 0;
        pixelArray[i] = ((currentByte << 1) & 0xFF) | firstBit;
    }
    spriteTextBox.value = toHexString(pixelArray);
    renderSpriteScreenFromText();
}

function moveSpriteRight() {
    for (let i = 0; i < pixelArray.length; i++) {
        let currentByte = pixelArray[i];
        let lastBit = (currentByte & 1) ? 1 : 0;
        pixelArray[i] = (currentByte >>> 1) | (lastBit << 7);
    }
    spriteTextBox.value = toHexString(pixelArray);
    renderSpriteScreenFromText();
}

function updateSpriteArea(e) {
    if (e.buttons == 1) {                       // If left click is pressed
        const ctx = spriteEditorArea.getContext('2d');
        ctx.fillStyle = 'black';
        ctx.fillRect(Math.floor(e.offsetX / scalingFactor) * scalingFactor,
                    Math.floor(e.offsetY / scalingFactor) * scalingFactor,
                    scalingFactor,
                    scalingFactor);
        // Turn the pixel on
        pixelArray[Math.floor(e.offsetY / scalingFactor)] |= (0b10000000 >>> Math.floor(e.offsetX / scalingFactor));
    }

    else if (e.buttons == 2) {                  // If right click is pressed
        const ctx = spriteEditorArea.getContext('2d');
        ctx.fillStyle = '#c4c4c4';
        ctx.fillRect(Math.floor(e.offsetX / scalingFactor) * scalingFactor,
                    Math.floor(e.offsetY / scalingFactor) * scalingFactor,
                    scalingFactor,
                    scalingFactor);
        // Turn the pixel off
        pixelArray[Math.floor(e.offsetY / scalingFactor)] &= ~(0b10000000 >> Math.floor(e.offsetX / scalingFactor));
    }

    spriteTextBox.value = toHexString(pixelArray);
}

function renderSpriteScreenFromText() {
    if (spriteTextBox.value == "") {
        clearSpriteArea();
    }

    else {
        let valueToConvert = spriteTextBox.value.split(',');
        for (let i = 0; i < valueToConvert.length; i++) {
            pixelArray[i] = parseInt(valueToConvert[i].trim());
        }

        const ctx = spriteEditorArea.getContext("2d");
        ctx.fillStyle = "#c4c4c4";
        ctx.clearRect(0, 0, spriteEditorArea.width, spriteEditorArea.height);

        for (let y = 0; y < pixelArray.length; y++) {
            for (let x = 0; x < 8; x++) {
                if (pixelArray[y] & (0b10000000 >>> x)) {
                    ctx.fillStyle = "black";
                    ctx.fillRect(x * scalingFactor, y * scalingFactor, scalingFactor, scalingFactor);
                }
            }
        }
    }
}
