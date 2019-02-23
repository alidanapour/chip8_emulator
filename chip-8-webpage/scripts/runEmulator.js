let romList = {
    "15PUZZLE": puzzle15,
    "BLINKY": blinky,
    "BLITZ": blitz,
    "BRIX": brix,
    "CGG": computer_grenade_graphic,
    "CONNECT4": connect4,
    "GUESS": guess,
    "HIDDEN": hidden,
    "INVADERS": invaders,
    "KALEID": kaleid,
    "MAZE": maze,
    "MERLIN": merlin,
    "MISSILE": missile,
    "PONG": pong,
    "PONG2": pong2,
    "PUZZLE": puzzle,
    "SFACES": smileyfaces,
    "SPACEWARS": spacewars,
    "SYZYGY": syzygy,
    "TANK": tank,
    "TETRIS": tetris,
    "TICTAC": tictac,
    "UFO": ufo,
    "VBRIX": vbrix,
    "VERS": vers,
    "WIPEOFF": wipeoff
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

let runProcess = null;          // Tracks the main run cycle
let timerProcess = null;        // Tracks the D/S timer cycle

let notPaused = true;
let emulatorSpeed = 8;     // Default speed is 8 cycles/frame
let CHIP8 = new CPU();


/////////////////////////
//                     //
//  Keyboard Controls  //
//                     //
/////////////////////////


let keyMap = {
    '1': 0x1, '2': 0x2, '3': 0x3, '4': 0xC,
    'q': 0x4, 'w': 0x5, 'e': 0x6, 'r': 0xD,
    'a': 0x7, 's': 0x8, 'd': 0x9, 'f': 0xE,
    'z': 0xA, 'x': 0x0, 'c': 0xB, 'v': 0xF,
};

document.addEventListener("keydown", function(event) {
    CHIP8.setKeyDown(keyMap[event.key]);
});

document.addEventListener("keyup", function(event) {
    CHIP8.setKeyUp(keyMap[event.key]);
});


/////////////////////////
//                     //
//  Webpage Controls   //
//                     //
/////////////////////////


function runEmulator(menu) {

    CHIP8.reset();
    CHIP8.isRunning = true;

    if (menu.value == "NOTHING") {
        CHIP8.reset();
        CHIP8.emulateOpcode(0x00E0);              // Clear the screen
    }

    else {
        let romChosen = romList[menu.value];
        let len = romChosen.length;
        for (let i = 0; i < len; i++)
            CHIP8.memory[CHIP8.PC + i] = romChosen[i];
    }

    document.getElementById('rom').value = "";
}

function setEmulatorSpeed(menu) {
    emulatorSpeed = menu.value;
}

// function restartPressed() {
//     let tempMemory = new Uint8Array(4096);
//     for (let i = 512; i < 4096; i++)
//         tempMemory[i] = CHIP8.memory[i];

//     CHIP8.reset();

//     for (let i = 512; i < 4096; i++)
//         CHIP8.memory[i] = tempMemory[i];

//     CHIP8.isRunning = true;
// }

function pausePressed() {
    CHIP8.isRunning = false;
}

function continuePressed() {
    CHIP8.isRunning = true;
}

function resetPressed() {
    CHIP8.emulateOpcode(0x00E0);
    CHIP8.renderScreen();
    CHIP8.reset();
    document.getElementById('rom').value = "";
    document.getElementById('games').value = "";
}

function checkShiftQuirks() {
    resetPressed();
    let checkbox1 = document.getElementById('squirk');
    CHIP8.newShiftQuirk = checkbox1.checked ? true : false;
}

function checkLoadStoreQuirks() {
    resetPressed();
    let checkbox2 = document.getElementById('lsquirk');
    CHIP8.newLoadStoreQuirk = checkbox2.checked ? true : false;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


/////////////////////////
//                     //
//  Run Cycle Controls //
//                     //
/////////////////////////


// Load ROM into memory
window.onload = function() {

    // File Reader ///////////////////////////////////////////

    var fileInput = document.getElementById('rom');

    fileInput.addEventListener('change', function(e) {   
        // load new ROM if user select a file 
        if(fileInput.files.length === 1) { 
            var file = fileInput.files[0];

            CHIP8.reset();
            CHIP8.loadProgram(file);
            CHIP8.isRunning = true;

            document.getElementById('games').value = "";
        }
    });

    // Run Processes //////////////////////////////////////////

    if (runProcess != null)                 // Clear previous program process (required when changing ROMs)
        clearInterval(runProcess);

    if (timerProcess != null)
        clearInterval(timerProcess);

    let beepSound = new Audio ("beep.wav"); // Buffer beep sound

    runProcess = setInterval (function() {
        if (CHIP8.isRunning) {
            for (let i = 0; i < emulatorSpeed; i++) {      // Emulator speed = cycles per frame
                let opcode = CHIP8.memory[CHIP8.PC] << 8 | CHIP8.memory[CHIP8.PC + 1];
                CHIP8.emulateOpcode(opcode);
                CHIP8.renderScreen();
            }
        }
    }, 1000/60);

    timerProcess = setInterval(function() {
        if (CHIP8.isRunning) {
            if (CHIP8.soundTimer > 0)
                beepSound.play();
            CHIP8.setTimer();
        }
    }, 1000/60);
} // End of window.onload function
