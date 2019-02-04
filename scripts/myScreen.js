let screenWidth = 64;
let screenHeight = 32;
let numberOfPixels = screenWidth * screenHeight;

let running = true;

let display = new Array(numberOfPixels);
display.fill(0);
display[0] = 1;

let i = 0;
function renderScreen() {
    const canvas = document.getElementById("myScreen");
    const screen = canvas.getContext("2d");

    for (let y = 0; y < screenHeight; y++) {
        for (let x = 0; x < screenWidth; x++) {
            if (display[x + screenWidth * y] !== 0x0)
                screen.fillRect (x * 10, y * 10, 10, 10);
        }
    }

    let elem = display.pop();
    display.unshift(elem);

    if (running) clearInterval(intervalValue);
        // window.requestAnimationFrame(renderScreen());
}

function run() {
    let intervalValue = setInterval(renderScreen, 1); 
    // window.requestAnimationFrame(renderScreen());
}