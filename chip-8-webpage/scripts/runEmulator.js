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

let runProcess = null;              // Tracks the main run cycle
let timerProcess = null;            // Tracks the D/S timer cycle
let displayRegisters = null;        // Tracks the registers visualizer
let displayInstructions = null;     // Tracks the instructions visualizer

let notPaused = true;               // Game is running
let emulatorSpeed = 8;              // Default speed is 8 cycles/frame
let isTimerFixed = false;           // Fix the delay timer to 1 cycle/frame
let CHIP8 = new CPU();              // Initialize a CHIP8 CPU object
let prevCachedPC = 0;               // To update instruction list

let cpuCacheStack = new Array();    // Stack for storing CPU states (for stepping backward)
let currentRom = new Array();       // Store the current ROM for restarting later

function pushCpuStateToStack(x) {
    let tempState = {
        V_cache: x.V.slice(),
        I_cache: x.I,
        memory_cache: x.memory.slice(),
        PC_cache: x.PC,
        stack_cache: x.stack.slice(),
        stackPointer_cache: x.stackPointer,
        delayTimer_cache: x.delayTimer,
        soundTimer_cache: x.soundTimer,
        display_cache: x.display.slice(),
    }
    
    if (cpuCacheStack.length < 1000)
        cpuCacheStack.push(tempState);
    else {
        cpuCacheStack.push(tempState);
        cpuCacheStack.shift();
    }
} // End of pushCpuStateToStack()

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


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


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


/////////////////////////
//                     //
//  Webpage Controls   //
//                     //
/////////////////////////


function resetVisualizer() {

    // Reset register values to 0
    let registers = document.getElementsByClassName('registers_inner');
    for (let i = 0; i < registers.length; i++) {
        
        let default_value = "0x0000";       // PC & I are 4 bytes each
        if (i >= 2)
            default_value = "0x00";         // SP, DT, ST & V are 2 bytes each

        registers[i].innerHTML = registers[i].id + ": " + default_value;

    }

    // Reset instructions div
    let instructionsDiv = document.querySelector('.instructions');
    
    while (instructionsDiv.firstChild)      // Remove all instructions
        instructionsDiv.removeChild(instructionsDiv.firstChild);
    
    let el = document.createElement('div');
    el.innerHTML = 'Instructions';
    instructionsDiv.appendChild(el);

    // Reset prevCachedPC
    prevCachedPC = 0;
}


function hex_display(value, displayLength) {
    return (value.toString(16).padStart(displayLength, '0').toUpperCase());
}


function runEmulator(menu) {

    CHIP8.reset();
    CHIP8.isRunning = true;

    if (menu.value == "NOTHING") {
        CHIP8.reset();
        CHIP8.emulateOpcode(0x00E0);       // Clear the screen
    }

    else {
        let romChosen = romList[menu.value];
        let len = romChosen.length;
        for (let i = 0; i < len; i++)
            CHIP8.memory[CHIP8.PC + i] = romChosen[i];
		currentRom = CHIP8.memory.slice();  // Update current ROM
		// description(menu.value);			// For updating description based on ROM selected
    }

    document.getElementById('rom').value = "";

}


function setEmulatorSpeed(menu) {
    emulatorSpeed = menu.value;
}


function pausePressed() {
    CHIP8.isRunning = false;
}


function continuePressed() {
    CHIP8.isRunning = true;
}


function stepForwardPressed() {

    pushCpuStateToStack(CHIP8);

    let opcode = CHIP8.memory[CHIP8.PC] << 8 | CHIP8.memory[CHIP8.PC + 1];
    CHIP8.emulateOpcode(opcode);
    CHIP8.renderScreen();

    ///////////////////////////////////////////////////////////////////////

    if (CHIP8.soundTimer > 0)
        beepSound.play();
    CHIP8.setTimer();           // 1:1 ratio when manually stepping through instructions

    updateVisualizerRegisters();
    updateVisualizerInstructions();

} // End of stepForwardPressed()


function stepBackwardPressed() {

    let x = cpuCacheStack.pop();

    CHIP8.V = x.V_cache.slice();
    CHIP8.I = x.I_cache;
    CHIP8.memory = x.memory_cache.slice();
    CHIP8.PC = x.PC_cache;
    CHIP8.stack = x.stack_cache.slice();
    CHIP8.stackPointer = x.stackPointer_cache;
    CHIP8.delayTimer = x.delayTimer_cache;
    CHIP8.soundTimer = x.soundTimer_cache;
    CHIP8.display = x.display_cache.slice();
    
    CHIP8.drawFlag = true;

    updateVisualizerInstructions();
    updateVisualizerRegisters();

    CHIP8.renderScreen();

    ///////////////////////////////////////////////////////////////////////

    if (CHIP8.soundTimer > 0)
        beepSound.play();
    CHIP8.setTimer();           // 1:1 ratio when manually stepping through instructions

} // End of stepBackwardPressed()


function resetPressed() {
    CHIP8.emulateOpcode(0x00E0);
    CHIP8.renderScreen();
    CHIP8.reset();
    document.getElementById('rom').value = "";
    document.getElementById('games').value = "";
    document.getElementById('speed').value = 8;
    emulatorSpeed = 8;
    cpuCacheStack = new Array();
    resetVisualizer();
    currentRom = new Array();
}


function restartRomPressed() {
    CHIP8.reset();
    CHIP8.memory = currentRom.slice();
    cpuCacheStack = new Array();
    resetVisualizer();
    CHIP8.isRunning = true;
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


function checkTimerQuirk() {
    let checkbox3 = document.getElementById('fixtimer');
    isTimerFixed = checkbox3.checked ? true : false;
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


/////////////////////////
//                     //
//  Update Visualizer  //
//                     //
/////////////////////////


function updateVisualizerRegisters() {

    let registers = document.getElementsByClassName('registers_inner');
    let specialRegisters = [CHIP8.PC, CHIP8.I, CHIP8.stackPointer,
                            CHIP8.delayTimer, CHIP8.soundTimer];
    let numSpecialRegisters = specialRegisters.length;

    // 5 special registers
    for (let i = 0; i < numSpecialRegisters; i++) {
        
        let displayValue = hex_display(specialRegisters[i], 4);

        if (i >= 2)
            displayValue = hex_display(specialRegisters[i], 2);
        
        registers[i].innerHTML = registers[i].id + ": 0x" + displayValue;

    }

    // V0 to VF
    let lengthVRegisters = CHIP8.V.length;
    for (let i = 0; i < lengthVRegisters; i++) {
        let j = i + numSpecialRegisters;        // Skip 5 special registers
        registers[j].innerHTML = registers[j].id + ": 0x" + hex_display(CHIP8.V[i], 2);
    }

}


function updateVisualizerInstructions() {

    let instructionsDiv = document.querySelector('.instructions');

    // Remove old instruction list
    while (instructionsDiv.firstChild)
        instructionsDiv.removeChild(instructionsDiv.firstChild);

    let currentPC = CHIP8.PC;
    let PC_difference = currentPC - prevCachedPC;

    // If currentPC is 19 opcodes away or currentPC is behind prevCachedPC
    // ---> then update prevCachedPC
    if (PC_difference > 19 * 2 || PC_difference < 0)
        prevCachedPC = currentPC;

    let _pc_ = Math.max((prevCachedPC - 2), 0);

    for (let i = 0; i < 21; i++) {

        const el = document.createElement('div');
        let opcode = (CHIP8.memory[_pc_] << 8) | CHIP8.memory[_pc_ + 1];
        opcode = opcode.toString(16).padStart(4, '0');

        el.innerHTML = hex_display(_pc_, 4) + " | " + disassembleOpcode(opcode);

        if (_pc_ === CHIP8.PC)
            el.classList.add('current-instruction');

        instructionsDiv.appendChild(el);
        _pc_ += 2;
        
    }

}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


/////////////////////////
//                     //
//  Run Cycle Controls //
//                     //
/////////////////////////


// Load ROM into memory
window.onload = function() {


    // File Reader //////////////////////////////////////////////////////////////////////////

    var fileInput = document.getElementById('rom');

    fileInput.addEventListener('change', function(e) {   

        // Load new ROM if user selects a file 
        if (fileInput.files.length === 1) { 

            var file = fileInput.files[0];

            CHIP8.reset();
            CHIP8.loadProgram(file);
            CHIP8.isRunning = true;

            document.getElementById('games').value = "";
        }

    });


    // Run Processes ////////////////////////////////////////////////////////////////////////

    if (runProcess != null || timerProcess != null) {       // Clear previous program processes (required when switching b/w ROMs)
        clearInterval(runProcess);
        clearInterval(timerProcess);
    }

    let beepSound = new Audio ("beep.wav");     // Buffer beep sound

    runProcess = setInterval (function() {
        if (CHIP8.isRunning) {
            for (let i = 0; i < emulatorSpeed; i++) {       // Emulator speed = cycles per frame
                let opcode = CHIP8.memory[CHIP8.PC] << 8 | CHIP8.memory[CHIP8.PC + 1];
                CHIP8.emulateOpcode(opcode);
                CHIP8.renderScreen();
                pushCpuStateToStack(CHIP8);
            }
            updateVisualizerRegisters();        // Update the registers
            updateVisualizerInstructions();     // Update the instructions
        }
    }, 1000/60);

    timerProcess = setInterval (function() {
        let timerRatio = isTimerFixed ? 1 : emulatorSpeed/parseFloat(8);
        for (let i = 0; i < timerRatio; i++) {
            if (CHIP8.isRunning) {
                if (CHIP8.soundTimer > 0)
                    beepSound.play();
                CHIP8.setTimer();
            }
        }
    }, 1000/60);

} // End of window.onload function
