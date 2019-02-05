/* let screenWidth = 64;
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
} */

let sWidth = 64;
let sHeight = 32;
let numberOfPixels = sWidth * sHeight;

let running = true;

let display = new Array(numberOfPixels);
display.fill(1);
display[2] = 1;

let tempArray= new Array(numberOfPixels);
tempArray.fill(1);
display[2] = 1;

////////////////////////////////////////////////////////

function xorArrays(array1, array2) {
	let newArray= new Array(array1.length);
	newArray.fill(0);

	let length = array1.length; 
	for(let i = 0; i < length; i++){
		if (array1[i] === array2[i])
			newArray[i] = 0;
		else
			newArray[i] = 1;
	}
	return newArray;
}

////////////////////////////////////////////////////////

function renderScreen() {
    const canvas = document.getElementById("screen-area");
    const screen = canvas.getContext("2d");

    for (let y = 0; y < sHeight; y++) {
        for (let x = 0; x < sWidth; x++) {
            if (display[x + sWidth * y] == 1)
                screen.fillRect (x * 10, y * 10, 10, 10);
			else
				screen.clearRect(x * 10, y * 10, 10, 10);
        }
    }

    display = xorArrays(display, tempArray);
	// window.requestAnimationFrame(renderScreen); //include this line if you included the one from index.html
}
