let screenWidth = 64;
let screenHeight = 32;
let numberOfPixels = screenWidth * screenHeight;

let running = true;

let display = new Array(numberOfPixels);
display.fill(1);

let tempArray= new Array(numberOfPixels);
tempArray.fill(1);

let i = 0;
function renderScreen() {
    const canvas = document.getElementById("myScreen");
    const screen = canvas.getContext("2d");

    for (let y = 0; y < screenHeight; y++) {
        for (let x = 0; x < screenWidth; x++) {
            if (display[x + screenWidth * y] == 1){
                screen.fillRect (x * 10, y * 10, 10, 10);
							}
						else{
							screen.clearRect(x * 10, y * 10, 10, 10)
						}
        }

    }

    display=xor(display, tempArray)
}

function xor(a1, a2){
	let newArray= new Array(a1.length);
	newArray.fill(0);

	let i=0;
	let j=0;
	let length= a1.length;

	for(i;i<length;i++){
		if(a1[i]==a2[i]){
			newArray[i]=0;
		}

		else if(a1[i]!=a2[i]){
			newArray[i]=1;
		}
	}
	return newArray;
}
