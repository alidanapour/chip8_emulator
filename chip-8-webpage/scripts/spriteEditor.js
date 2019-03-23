let scalingFactor = 20;         		// Scale pixels by this factor

let canvas = document.getElementById('sprite-draw')
let c = canvas.getContext('2d');
let spriteLength = 15;
let spriteWidth = 8;
let numberOfPixels = spriteLength * spriteWidth;

canvas.addEventListener('click', updateSpriteArea);
canvas.addEventListener('mousemove', updateSpriteArea)

let pixelArray = new Array(numberOfPixels);     // Array to store sprite pixels

function clearSpriteArea() {
    c.fillStyle = 'lightslategrey';
    c.fillRect(0, 0, 300, 160);
}

function updateSpriteArea(e) {
    c.fillStyle = 'black';
    c.fillRect(Math.floor(e.offsetX / scalingFactor) * scalingFactor,
               Math.floor(e.offsetY / scalingFactor) * scalingFactor,
               scalingFactor,
               scalingFactor);
}