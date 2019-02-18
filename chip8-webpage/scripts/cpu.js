"use strict";

class CPU {
    
    constructor(){

        this.V = new Uint8Array(16);            // V0 to Vf are the 16 8-bit registers
        this.I = 0;                             // Special 16-bit address register I
        this.memory = new Uint8Array(4096);     // 4K (4096) bytes of memory
        this.PC = 0x200;                        // Program counter (16-bit) starts at 0x200 (512)
        this.stack = new Uint16Array(16);       // Array of 16 16-bit values
        this.stackPointer = 0;                  // Points to the top of the stack

        this.delayTimer = 0;                    // Delay timer initialized to 0
        this.soundTimer = 0;                    // Sound timer initialized to 0
        this.upT = null; 		                // Interval for updating timers			

        this.screenWidth = 64;
        this.screenHeight = 32;
        this.display = new Uint8Array(this.screenWidth * this.screenHeight); // Video memory, used to draw frames
        this.drawFlag = false;                  // Tells whether to draw

        this.keys = new Uint8Array(16);         // Stores the status of the keys
        this.keyPressed = false;                // True when a key is pressed

        this.isRunning = false;                 // CPU run status
        this.programLoaded = false;		        // True when the program has been loaded into memory

        this.fontsToStore = [                   
            0xF0, 0x90, 0x90, 0x90, 0xF0, // 0
            0x20, 0x60, 0x20, 0x20, 0x70, // 1
            0xF0, 0x10, 0xF0, 0x80, 0xF0, // 2
            0xF0, 0x10, 0xF0, 0x10, 0xF0, // 3
            0x90, 0x90, 0xF0, 0x10, 0x10, // 4
            0xF0, 0x80, 0xF0, 0x10, 0xF0, // 5
            0xF0, 0x80, 0xF0, 0x90, 0xF0, // 6
            0xF0, 0x10, 0x20, 0x40, 0x40, // 7
            0xF0, 0x90, 0xF0, 0x90, 0xF0, // 8
            0xF0, 0x90, 0xF0, 0x10, 0xF0, // 9
            0xF0, 0x90, 0xF0, 0x90, 0x90, // A
            0xE0, 0x90, 0xE0, 0x90, 0xE0, // B
            0xF0, 0x80, 0x80, 0x80, 0xF0, // C
            0xE0, 0x90, 0x90, 0x90, 0xE0, // D
            0xF0, 0x80, 0xF0, 0x80, 0xF0, // E
            0xF0, 0x80, 0xF0, 0x80, 0x80  // F
        ];

    } // End of constructor()

    loadFonts(){

        let length = this.fontsToStore.length;

        for(let i = 0; i < length; i++){
            this.memory[i] = this.fontsToStore[i]
        }

    } // End of loadFonts()

    reset(){

        this.V.fill(0);			                        // Clear registers
	    this.memory.fill(0);		                    // Clear RAM
	    this.display.fill(0);		                    // Clear memory
	    this.loadFonts();			                    // Load font set
	    this.I = 0;				                        // Clear register I
	    this.PC = 0x200;			                    // PC starts at 0x200 (512)
	    this.stack = new Uint16Array(16);	            // Clear program stack
	    this.stackPointer = 0;		                    // Clear stack pointer
	    this.delayTimer = 0;		                    // Clear delay timer
	    this.soundTimer = 0;		                    // Clear sound timer
	    this.isRunning = false;	                        // Set CPU run status to false
	    this.keys.fill(0);			                    // Clear keys
	    this.keyPressed = false;	                    // Set key pressed to false
	    this.drawFlag = false;		                    // Don't draw anything
        this.upT = setInterval(this.setTimer, 100);     // ID value of the timer that is set (ASK KARAN)
                                                        // TODO: change 100 into a param of reset()
    } // End of reset()

    setTimer(){

        if (this.delayTimer > 0) {
            this.delayTimer--;
        }
	    if (this.soundTimer > 0) {
            this.soundTimer--;
        }

    } // End of setTimer()

    // Renders the display onto the screen by XORing
    renderScreen() {
        if (this.drawFlag === false)
            return;

        const canvas = document.getElementById("screen-area"); // TODO: to param
        const screen = canvas.getContext("2d");               // TODO: tp param

        let length = this.display.length;

        for (let i = 0; i < length; i++) {
            if (this.display[i] === 1) {
                let y = i / 64 | 0;
                let x = i - (y * 64);
                screen.fillRect(x * 10, y * 10, 10, 10);
            }
            else if (this.display[i] === 0) {
                let y = i / 64 | 0;
                let x = i - (y * 64);
                screen.clearRect(x * 10, y * 10, 10, 10);
            }
        }

        this.drawFlag = false;
    } // End of renderScreen()

    // Main run cycle
    // run() {
        
    //     console.log(this.memory);
    //     let opcode = this.memory[this.PC] << 8 | this.memory[this.PC + 1];
    //     this.setTimer();
    //     this.emulateOpcode(opcode);
    //     this.renderScreen();

    // } // End of run()

    // Opcode implementations
    emulateOpcode(opcode) {
        let code = opcode; 						// 1111-2222-3333-4444
        let x = (code & 0x0F00) >>> 8;          // 0x00
        let y = (code & 0x00F0) >>> 4;          // 00y0
        let kk = code & 0x00FF;                 // 00kk
        let nnn = code & 0xFFF;					// 0nnn

        switch (code & 0xF000) {
            case 0x0000:

                switch (code & 0x00FF) {

                    case 0x00E0:

                        // 00E0 - CLS
                        this.display.fill(0);
                        this.drawFlag = true;
                        this.PC += 2;
                        break;

                    case 0x00EE:

                        // 00EE - RET
                        this.stackPointer--;
                        this.PC = this.stack[this.stackPointer];
                        //CHIP8.stack.pop();
                        break;
                }

                break;

            case 0x1000:

                // 1nnn - JP addr
                this.PC = nnn;
                break;

            case 0x2000:

                // 2nnn - CALL addr
                this.stack[this.stackPointer] = this.PC + 2;
                this.stackPointer++;
                this.PC = nnn;
                break;

            case 0x3000:

                // 3xkk - SE Vx, byte
                if (this.V[x] === kk)
                    this.PC += 2;
                this.PC += 2;
                break;

            case 0x4000:

                // 4xkk - SNE Vx, byte
                if (this.V[x] !== kk)
                    this.PC += 2;
                this.PC += 2;
                break;

            case 0x5000:

                // 5xy0 - SE Vx, Vy
                if (this.V[x] === this.V[y])
                    this.PC += 2;
                this.PC += 2;
                break;

            case 0x6000:

                // 6xkk - LD Vx, byte
                this.V[x] = kk;
                this.PC += 2;
                break;

            case 0x7000:

                // 7xkk - ADD Vx, byte
                this.V[x] += kk;
                this.PC += 2;
                break;

            case 0x8000:

                switch (code & 0x000F) {

                    case 0x0000:

                        // 8xy0 - LD Vx, Vy
                        this.V[x] = this.V[y];
                        this.PC += 2;
                        break;

                    case 0x0001:

                        // 8xy1 - OR Vx, Vy
                        this.V[x] = this.V[x] | this.V[y];
                        this.PC += 2;
                        break;

                    case 0x0002:

                        // 8xy2 - AND Vx, Vy
                        this.V[x] = this.V[x] & this.V[y];
                        this.PC += 2;
                        break;

                    case 0x0003:

                        // 8xy3 - XOR Vx, Vy
                        this.V[x] = this.V[x] ^ this.V[y];
                        this.PC += 2;
                        break;

                    case 0x0004:

                        // 8xy4 - ADD Vx, Vy
                        let sum = this.V[x] + this.V[y];
                        if (sum > 0xFF)
                            this.V[15] = 1;
                        else
                            this.V[15] = 0;
                        this.V[x] = sum & 0xFF;
                        break;

                    case 0x0005:

                        // 8xy5 - SUB Vx, Vy
                        if (this.V[x] > this.V[y])
                            this.V[15] = 1;           		// Vf = Not Borrow
                        else
                            this.V[15] = 0;
                        this.V[x] -= this.V[y];
                        this.PC += 2;
                        break;

                    case 0x0006:

                        // 8xy6 - SHR Vx {, Vy}
                        if (this.V[x] & 0x01)
                            this.V[15] = 1;
                        else
                            this.V[15] = 0;
                        this.V[x] = this.V[x] >>> 1;    	// >> or >>>
                        this.PC += 2;
                        break;

                    case 0x0007:

                        // 8xy7 - SUBN Vx, Vy
                        if (this.V[y] > this.V[x])	    // Vf = Not Borrow
                            this.V[15] = 1;
                        else
                            this.V[15] = 0;
                        this.V[x] = this.V[y] - this.V[x];
                        this.PC += 2;
                        break;

                    case 0x000E:

                        // 8xyE - SHL Vx {, Vy}
                        if (this.V[x] & 0x80)
                            this.V[15] = 1;
                        else
                            this.V[15] = 0;
                        this.V[x] = this.V[x] << 1;
                        break;
                }
                break;

            case 0x9000:

                // 9xy0 - SNE Vx, Vy
                if (this.V[x] !== this.V[y])
                    this.PC += 2;
                this.PC += 2;
                break;

            case 0xA000:

                // Annn - LD I, addr
                this.I = nnn;
                this.PC += 2;
                break;

            case 0xB000:

                // Bnnn - JP V0, addr
                this.PC = this.V[0] + nnn;
                break;

            case 0xC000:

                // Cxkk - RND Vx, byte
                let random_byte = Math.floor(Math.random() * 256);		// 0 to 255
                this.V[x] = random_byte & kk;
                this.PC += 2;
                break;

            case 0xD000:

                // Dxyn - DRW Vx, Vy, nibble
                this.V[15] = 0;
                let n = code & 0x000F;
                for (let i = 0; i < n; i++) {
                    let bitToDraw = this.memory[this.I + i];
                    for (let j = 0; j < 8; j++) {
                        if ((bitToDraw & (0x80 >> j)) !== 0) {
                            if (this.display[(this.V[x] + j) + ((this.V[y] + i) * 64)] === 1)
                                this.V[15] = 1;
                            this.display[(this.V[x] + j) + ((this.V[y] + i) * 64)] ^= 1;
                        }
                    }
                }
                this.drawFlag = true;
                this.PC += 2;
                break;

            case 0xE000:

                switch (code & 0x00FF) {

                    case 0x009E:

                        // Ex9E - SKP Vx
                        if (this.keys[this.V[x]] !== 0)
                            this.PC += 2;
                        this.PC += 2;
                        break;

                    case 0x00A1:

                        // ExA1 - SKNP Vx
                        if (this.keys[this.V[x]] === 0)
                            this.PC += 2;
                        this.PC += 2;
                        break;
                }

            case 0xF000:

                switch (code & 0x00FF) {

                    case 0x0007:

                        // Fx07 - LD Vx, DT
                        this.V[x] = this.delayTimer;
                        this.PC += 2;
                        break;

                    case 0x000A:

                        // Fx0A - LD Vx, K
                        this.V[x] = this.keyPressed;
                        this.PC += 2;
                        break;

                    case 0x0015:

                        // Fx15 - LD DT, Vx
                        this.delayTimer = this.V[x];
                        this.PC += 2;
                        break;

                    case 0x0018:

                        // Fx18 - LD ST, Vx
                        this.soundTimer = this.V[x];
                        this.PC += 2;
                        break;

                    case 0x001E:

                        // Fx1E - ADD I, Vx
                        this.I += this.V[x];
                        this.PC += 2;
                        break;

                    case 0x0029:

                        // Fx29 - LD F, Vx
                        this.I = this.V[x] * 0x5;
                        this.PC += 2;
                        break;

                    case 0x0033:

                        // Fx33 - LD B, Vx
                        this.memory[this.I] = this.V[x] / 100;
                        this.memory[this.I + 1] = (this.V[x] / 10) % 10;
                        this.memory[this.I + 2] = (this.V[x] % 100) % 10;
                        break;

                    case 0x0055:

                        // Fx55 - LD [I], Vx
                        for (let i = 0; i <= x; i++) {
                            this.memory[this.I + i] = this.V[i];
                        }
                        this.I += x + 1;
                        this.PC += 2;
                        break;

                    case 0x0065:

                        // Fx65 - LD Vx, [I]
                        for (let i = 0; i <= x; i++) {
                            this.V[i] = this.memory[this.I + i];
                        }
                        this.I += x + 1;
                        this.PC += 2;
                        break;

                }

                break;
            // no default case (is it needed?)
        }

    } // End of  emulateOpcode(opcode)

} // End of CPU class



function printTestResults (str) {
    let node = document.createElement("li");
    let text_node = document.createTextNode(str);
    node.appendChild(text_node);
    document.getElementById("test-results").appendChild(node);
}

function runAllTests() {
    document.getElementById("test-results").innerHTML = "";
    let str = "";
    
    str = "V Is An Array of 16 Registers: ";
    str += TESTS.VIsAnArrayOf16Registers() ? 'SUCCESS\n' : 'FAILURE\n';
    printTestResults(str);
    
    str = "Memory Is 4K Bytes (4096 Bytes) Long: ";
    str += TESTS.MemoryIs4096BytesWide() ? 'SUCCESS\n' : 'FAILURE\n';
    printTestResults(str);

    str = "PC Set To 0x200 (512): ";
    str += TESTS.PCSetTo0x200() ? 'SUCCESS\n' : 'FAILURE\n';
    printTestResults(str);

    str = "Stack Is 16 Elements Wide: ";
    str += TESTS.StackIs16ElementsWide() ? 'SUCCESS\n' : 'FAILURE\n';
    printTestResults(str);
    
    str = "Display Is 64x32 Pixels Wide: ";
    str += TESTS.DisplayIs64x32() ? 'SUCCESS\n' : 'FAILURE\n';
    printTestResults(str);
    
    str = "Fonts Loaded: ";
    str += TESTS.LoadFonts() ? 'SUCCESS\n' : 'FAILURE\n';
    printTestResults(str);
    
    str = "CPU Resetted: ";
    str += TESTS.ResetFunction() ? 'SUCCESS\n' : 'FAILURE\n';
    printTestResults(str);

    str = "0x00E0: ";
    str += TESTS.Opcode_00E0() ? 'SUCCESS\n' : 'FAILURE\n';
    printTestResults(str);
    
    str = "0x00EE: ";
    str += TESTS.Opcode_00EE() ? 'SUCCESS\n' : 'FAILURE\n';
    printTestResults(str);
    
    str = "0x1NNN: ";
    str += TESTS.Opcode_1NNN() ? 'SUCCESS\n' : 'FAILURE\n';
    printTestResults(str);
    
    str = "0x2NNN: ";
    str += TESTS.Opcode_2NNN() ? 'SUCCESS\n' : 'FAILURE\n';
    printTestResults(str);
    
    str = "0x3XKK: ";
    str += TESTS.Opcode_3XKK() ? 'SUCCESS\n' : 'FAILURE\n';
    printTestResults(str);
    
    str = "0x4XKK: ";
    str += TESTS.Opcode_4XKK() ? 'SUCCESS\n' : 'FAILURE\n';
    printTestResults(str);
    
    str = "0x5XY0: ";
    str += TESTS.Opcode_5XY0() ? 'SUCCESS\n' : 'FAILURE\n';
    printTestResults(str);
    
    str = "0x6XKK: ";
    str += TESTS.Opcode_6XKK() ? 'SUCCESS\n' : 'FAILURE\n';
    printTestResults(str);
    
    str = "0x7XKK: ";
    str += TESTS.Opcode_7XKK() ? 'SUCCESS\n' : 'FAILURE\n';
    printTestResults(str);
    
    str = "0x8XY0: ";
    str += TESTS.Opcode_8XY0() ? 'SUCCESS\n' : 'FAILURE\n';
    printTestResults(str);
    
    str = "0x8XY1: ";
    str += TESTS.Opcode_8XY1() ? 'SUCCESS\n' : 'FAILURE\n';
    printTestResults(str);
    
    str = "0x8XY2: ";
    str += TESTS.Opcode_8XY2() ? 'SUCCESS\n' : 'FAILURE\n';
    printTestResults(str);
    
    str = "0x8XY3: ";
    str += TESTS.Opcode_8XY3() ? 'SUCCESS\n' : 'FAILURE\n';
    printTestResults(str);
    
    str = "0x8XY4: ";
    str += TESTS.Opcode_8XY4() ? 'SUCCESS\n' : 'FAILURE\n';
    printTestResults(str);
    
    str = "0x8XY5: ";
    str += TESTS.Opcode_8XY5() ? 'SUCCESS\n' : 'FAILURE\n';
    printTestResults(str);
    
    str = "0x8XY6: ";
    str += TESTS.Opcode_8XY6() ? 'SUCCESS\n' : 'FAILURE\n';
    printTestResults(str);
    
    str = "0x8XY7: ";
    str += TESTS.Opcode_8XY7() ? 'SUCCESS\n' : 'FAILURE\n';
    printTestResults(str);
    
    str = "0x8XYE: ";
    str += TESTS.Opcode_8XYE() ? 'SUCCESS\n' : 'FAILURE\n';
    printTestResults(str);
    
    str = "0x9XY0: ";
    str += TESTS.Opcode_9XY0() ? 'SUCCESS\n' : 'FAILURE\n';
    printTestResults(str);
    
    str = "0xANNN: ";
    str += TESTS.Opcode_ANNN() ? 'SUCCESS\n' : 'FAILURE\n';
    printTestResults(str);
    
    str = "0xBNNN: ";
    str += TESTS.Opcode_BNNN() ? 'SUCCESS\n' : 'FAILURE\n';
    printTestResults(str);
    
    str = "0xCXKK: ";
    str += TESTS.Opcode_CXKK() ? 'SUCCESS\n' : 'FAILURE\n';
    printTestResults(str);
    
    str = "0xDXYN: ";
    str += TESTS.Opcode_DXYN() ? 'SUCCESS\n' : 'FAILURE\n';
    printTestResults(str);
    
    str = "0xEX9E: ";
    str += TESTS.Opcode_EX9E() ? 'SUCCESS\n' : 'FAILURE\n';
    printTestResults(str);
    
    str = "0xEXA1: ";
    str += TESTS.Opcode_EXA1() ? 'SUCCESS\n' : 'FAILURE\n';
    printTestResults(str);
    
    str = "0xFX07: ";
    str += TESTS.Opcode_FX07() ? 'SUCCESS\n' : 'FAILURE\n';
    printTestResults(str);
    
    str = "0xFX0A: ";
    str += TESTS.Opcode_FX0A() ? 'SUCCESS\n' : 'FAILURE\n';
    printTestResults(str);
    
    str = "0xFX15: ";
    str += TESTS.Opcode_FX15() ? 'SUCCESS\n' : 'FAILURE\n';
    printTestResults(str);
    
    str = "0xFX18: ";
    str += TESTS.Opcode_FX18() ? 'SUCCESS\n' : 'FAILURE\n';
    printTestResults(str);
    
    str = "0xFX1E: ";
    str += TESTS.Opcode_FX1E() ? 'SUCCESS\n' : 'FAILURE\n';
    printTestResults(str);
    
    str = "0xFX29: ";
    str += TESTS.Opcode_FX29() ? 'SUCCESS\n' : 'FAILURE\n';
    printTestResults(str);
    
    str = "0xFX33: ";
    str += TESTS.Opcode_FX33() ? 'SUCCESS\n' : 'FAILURE\n';
    printTestResults(str);
    
    str = "0xFX55: ";
    str += TESTS.Opcode_FX55() ? 'SUCCESS\n' : 'FAILURE\n';
    printTestResults(str);
    
    str = "0xFX65: ";
    str += TESTS.Opcode_FX65() ? 'SUCCESS' : 'FAILURE';
    printTestResults(str);
}

let CHIP8_TEST = new CPU();

let TESTS = {
    VIsAnArrayOf16Registers: function() {
        return (CHIP8_TEST.V.length === 16);
    },

    VIsEmpty: function() {
        return (CHIP8_TEST.V.every(x => x === 0));
    },

    IIsEmpty: function() {
        return (CHIP8_TEST.I === 0);
    },

    MemoryIs4096BytesWide: function() {
        return (CHIP8_TEST.memory.length === 4096);
    },

    MemoryIsEmpty: function() {
        return (CHIP8_TEST.memory.every(x => x === 0));
    },

    PCSetTo0x200: function() {
        CHIP8_TEST.reset();
        return (CHIP8_TEST.PC === 0x200);
    },

    StackIs16ElementsWide: function() {
        return (CHIP8_TEST.stack.length === 16);
    },

    StackIsEmpty: function() {
        return (CHIP8_TEST.stack.every(x => x === 0));
    },

    StackPointerIsEmpty: function() {
        return (CHIP8_TEST.stackPointer === 0);
    },

    DelayTimerIsEmpty: function() {
        return (CHIP8_TEST.delayTimer === 0);
    },

    SoundTimerIsEmpty: function() {
        return (CHIP8_TEST.soundTimer === 0);
    },

    DisplayIs64x32: function() {
        return (CHIP8_TEST.display.length === 64 * 32);
    },

    DisplayIsEmpty: function() {
        return (CHIP8_TEST.display.every(x => x === 0));
    },

    DrawFlagIsFalse: function() {
        return !(CHIP8_TEST.drawFlag);
    },

    LoadFonts: function() {
        CHIP8_TEST.loadFonts();
        let len = CHIP8_TEST.fontsToStore.length;
        for (let i = 0; i < len; i++) {
            if (CHIP8_TEST.memory[i] !== CHIP8_TEST.fontsToStore[i])
                return false;
        }
        return true;
    },

    ResetFunction: function() {
        CHIP8_TEST.reset();
        return (this.VIsAnArrayOf16Registers() && this.VIsEmpty()
            && this.MemoryIs4096BytesWide()
            && this.DisplayIs64x32() && this.DisplayIsEmpty()
            && this.LoadFonts() && this.IIsEmpty() && this.PCSetTo0x200()
            && this.StackIs16ElementsWide() && this.StackIsEmpty()
            && this.StackPointerIsEmpty() && this.DelayTimerIsEmpty()
            && this.SoundTimerIsEmpty() && this.DrawFlagIsFalse());
    },

    // AllOpcodes
        Opcode_00E0: function() {
            CHIP8_TEST.reset();
            CHIP8_TEST.emulateOpcode(0x00E0);
            return (this.DisplayIsEmpty() && !(this.DrawFlagIsFalse())
                && (CHIP8_TEST.PC == 514));
        },

        Opcode_00EE: function() {
            CHIP8_TEST.reset();
            CHIP8_TEST.stack[CHIP8_TEST.stackPointer++] = 0xFF;
            CHIP8_TEST.emulateOpcode(0x00EE);
            return ((CHIP8_TEST.stackPointer == 0) && (CHIP8_TEST.PC) == 0xFF);
        },

        Opcode_1NNN: function() {
            CHIP8_TEST.reset();
            CHIP8_TEST.emulateOpcode(0x1F02);
            return (CHIP8_TEST.PC == 0x0F02);
        },

        Opcode_2NNN: function() {
            CHIP8_TEST.reset();
            CHIP8_TEST.emulateOpcode(0x2F02);
            return (CHIP8_TEST.stack[0] == 514 && CHIP8_TEST.stackPointer === 1
                && CHIP8_TEST.PC === 0x0F02);
        },

        Opcode_3XKK: function() {
            CHIP8_TEST.reset();
            CHIP8_TEST.V[0] = 0xA1;
            CHIP8_TEST.emulateOpcode(0x30A1);
            if (CHIP8_TEST.PC != 516)
                return false;
            
            CHIP8_TEST.reset();
            CHIP8_TEST.V[0] = 0xF1;
            CHIP8_TEST.emulateOpcode(0x30A1);
            if (CHIP8_TEST.PC != 514)
                return false;

            return true;
        },

        Opcode_4XKK: function() {
            CHIP8_TEST.reset();
            CHIP8_TEST.V[0] = 0xA1;
            CHIP8_TEST.emulateOpcode(0x40A1);
            if (CHIP8_TEST.PC != 514)
                return false;
            
            CHIP8_TEST.reset();
            CHIP8_TEST.V[0] = 0xF1;
            CHIP8_TEST.emulateOpcode(0x40A1);
            if (CHIP8_TEST.PC != 516)
                return false;

            return true;
        },

        Opcode_5XY0: function() {
            CHIP8_TEST.reset();
            CHIP8_TEST.V[3] = 5;
            CHIP8_TEST.V[4] = 5;
            CHIP8_TEST.emulateOpcode(0x5340);
            if (CHIP8_TEST.PC != 516)
                return false;
            
            CHIP8_TEST.reset();
            CHIP8_TEST.V[3] = 5;
            CHIP8_TEST.V[4] = 0;
            CHIP8_TEST.emulateOpcode(0x5340);
            if (CHIP8_TEST.PC != 514)
                return false;

            return true;
        },

        Opcode_6XKK: function() {
            CHIP8_TEST.reset();
            CHIP8_TEST.emulateOpcode(0x6111);
            return (CHIP8_TEST.V[1] == 0x11);
        },

        Opcode_7XKK: function() {
            CHIP8_TEST.reset();
            CHIP8_TEST.V[1] = 0x2;
            CHIP8_TEST.emulateOpcode(0x7111);
            return (CHIP8_TEST.V[1] == (0x2 + 0x11));
        },

        Opcode_8XY0: function() {
            CHIP8_TEST.reset();
            CHIP8_TEST.V[1] = 5;
            CHIP8_TEST.V[2] = 8;
            CHIP8_TEST.emulateOpcode(0x8120);
            return (CHIP8_TEST.V[1] == 8);
        },

        Opcode_8XY1: function() {
            CHIP8_TEST.reset();
            CHIP8_TEST.V[1] = 5;
            CHIP8_TEST.V[2] = 8;
            CHIP8_TEST.emulateOpcode(0x8121);
            return (CHIP8_TEST.V[1] == (5 | 8));
        },

        Opcode_8XY2: function() {
            CHIP8_TEST.reset();
            CHIP8_TEST.V[1] = 5;
            CHIP8_TEST.V[2] = 8;
            CHIP8_TEST.emulateOpcode(0x8122);
            return (CHIP8_TEST.V[1] == (5 & 8));
        },

        Opcode_8XY3: function() {
            CHIP8_TEST.reset();
            CHIP8_TEST.V[1] = 5;
            CHIP8_TEST.V[2] = 8;
            CHIP8_TEST.emulateOpcode(0x8123);
            return (CHIP8_TEST.V[1] == (5 ^ 8));
        },

        Opcode_8XY4: function() {
            CHIP8_TEST.reset();
            CHIP8_TEST.V[1] = 5;
            CHIP8_TEST.V[2] = 8;
            CHIP8_TEST.emulateOpcode(0x8124);
            if ((CHIP8_TEST.V[1] != (5 + 8)) || (CHIP8_TEST.V[0xF] != 0))
                return false;

            CHIP8_TEST.reset();
            CHIP8_TEST.V[1] = 200;
            CHIP8_TEST.V[2] = 99;
            CHIP8_TEST.emulateOpcode(0x8124);
            if ((CHIP8_TEST.V[1] != (299 & 0xFF)) || (CHIP8_TEST.V[0xF] != 1))
                return false;

            return true;
        },

        Opcode_8XY5: function() {
            CHIP8_TEST.reset();
            CHIP8_TEST.V[1] = 5;
            CHIP8_TEST.V[2] = 8;
            CHIP8_TEST.emulateOpcode(0x8125);
            if ((CHIP8_TEST.V[1] != (0b11111101)) || CHIP8_TEST.V[0xF] != 0)
                return false;
            
            CHIP8_TEST.reset();
            CHIP8_TEST.V[1] = 8;
            CHIP8_TEST.V[2] = 5;
            CHIP8_TEST.emulateOpcode(0x8125);
            if ((CHIP8_TEST.V[1] != 3) || CHIP8_TEST.V[0xF] != 1)
                return false;

            return true;
        },

        Opcode_8XY6: function() {
            CHIP8_TEST.reset();
            CHIP8_TEST.V[1] = 2;     // 0000-0010
            CHIP8_TEST.emulateOpcode(0x8106);
            if ((CHIP8_TEST.V[0xF] == 1) || (CHIP8_TEST.V[1] != (2>>>1)))
                return false;
            
            CHIP8_TEST.reset();
            CHIP8_TEST.V[1] = 3;     // 0000-0011
            CHIP8_TEST.emulateOpcode(0x8106);
            if ((CHIP8_TEST.V[0xF] == 0) || (CHIP8_TEST.V[1] != (3>>>1)))
                return false;

            return true;
        },

        Opcode_8XY7: function() {
            CHIP8_TEST.reset();
            CHIP8_TEST.V[1] = 5;
            CHIP8_TEST.V[2] = 8;
            CHIP8_TEST.emulateOpcode(0x8127);
            if ((CHIP8_TEST.V[1] != (3)) || CHIP8_TEST.V[0xF] != 1)
                return false;
            
            CHIP8_TEST.reset();
            CHIP8_TEST.V[1] = 8;
            CHIP8_TEST.V[2] = 5;
            CHIP8_TEST.emulateOpcode(0x8127);
            if ((CHIP8_TEST.V[1] != (0b11111101)) || CHIP8_TEST.V[0xF] != 0)
                return false;

            return true;
        },

        Opcode_8XYE: function() {
            CHIP8_TEST.reset();
            CHIP8_TEST.V[1] = 2;     // 0000-0010
            CHIP8_TEST.emulateOpcode(0x810E);
            if ((CHIP8_TEST.V[0xF] == 1) || (CHIP8_TEST.V[1] != ((2<<1) & 0xFF)))
                return false;
            
            CHIP8_TEST.reset();
            CHIP8_TEST.V[1] = 128;     // 1000-0000
            CHIP8_TEST.emulateOpcode(0x810E);
            if ((CHIP8_TEST.V[0xF] == 0) || (CHIP8_TEST.V[1] != ((128<<1) & 0xFF)))
                return false;

            return true;
        },

        Opcode_9XY0: function() {
            CHIP8_TEST.reset();
            CHIP8_TEST.V[0] = 0xA1;
            CHIP8_TEST.V[1] = 0xA1;
            CHIP8_TEST.emulateOpcode(0x9010);
            if (CHIP8_TEST.PC != 514)
                return false;
            
            CHIP8_TEST.reset();
            CHIP8_TEST.V[0] = 0xF1;
            CHIP8_TEST.V[1] = 0xA1;
            CHIP8_TEST.emulateOpcode(0x9010);
            if (CHIP8_TEST.PC != 516)
                return false;

            return true;
        },

        Opcode_ANNN: function() {
            CHIP8_TEST.reset();
            CHIP8_TEST.emulateOpcode(0xAF10);
            return (CHIP8_TEST.I == 0xF10);
        },

        Opcode_BNNN: function() {
            CHIP8_TEST.reset();
            CHIP8_TEST.V[0] = 0x5;
            CHIP8_TEST.emulateOpcode(0xBF10);
            return (CHIP8_TEST.PC == (CHIP8_TEST.V[0] + 0xF10));
        },

        Opcode_CXKK: function() {
            CHIP8_TEST.reset();
            CHIP8_TEST.emulateOpcode(0xC100);
            if (CHIP8_TEST.V[1] != 0)
                return false;

            CHIP8_TEST.reset();
            CHIP8_TEST.emulateOpcode(0xC101);
            if (CHIP8_TEST.V[1] > 1)
                return false;

            return true;
        },

        Opcode_DXYN: function() {
            CHIP8_TEST.reset();
            CHIP8_TEST.memory[0] = 0x01;
            CHIP8_TEST.emulateOpcode(0xD001);
            return (CHIP8_TEST.display[7] == 1 && CHIP8_TEST.drawFlag == true);
        },

        Opcode_EX9E: function() {
            CHIP8_TEST.reset();
            CHIP8_TEST.V[2] = 5;
            CHIP8_TEST.keys[5] = 1;
            CHIP8_TEST.emulateOpcode(0xE29E);
            if (CHIP8_TEST.PC != 516)
                return false;

            CHIP8_TEST.reset();
            CHIP8_TEST.V[2] = 5;
            CHIP8_TEST.keys[5] = 0;
            CHIP8_TEST.emulateOpcode(0xE29E);
            if (CHIP8_TEST.PC != 514)
                return false;

            return true;
        },

        Opcode_EXA1: function() {
            CHIP8_TEST.reset();
            CHIP8_TEST.V[2] = 5;
            CHIP8_TEST.keys[5] = 1;
            CHIP8_TEST.emulateOpcode(0xE29E);
            if (CHIP8_TEST.PC != 516)
                return false;

            CHIP8_TEST.reset();
            CHIP8_TEST.V[2] = 5;
            CHIP8_TEST.keys[5] = 0;
            CHIP8_TEST.emulateOpcode(0xE29E);
            if (CHIP8_TEST.PC != 514)
                return false;

            return true;
        },

        Opcode_FX07: function() {
            CHIP8_TEST.reset();
            CHIP8_TEST.delayTimer = 0xF;
            CHIP8_TEST.V[5] = 4;
            CHIP8_TEST.emulateOpcode(0xF507);
            return (CHIP8_TEST.V[5] == CHIP8_TEST.delayTimer);
        },

        Opcode_FX0A: function() {
            CHIP8_TEST.reset();
            CHIP8_TEST.V[5] = 4;
            CHIP8_TEST.keyPressed = 0xA;
            CHIP8_TEST.emulateOpcode(0xF50A);
            return (CHIP8_TEST.V[5] == CHIP8_TEST.keyPressed);
        },
        
        Opcode_FX15: function() {
            CHIP8_TEST.reset();
            CHIP8_TEST.V[5] = 4;
            CHIP8_TEST.emulateOpcode(0xF515);
            return (CHIP8_TEST.delayTimer == CHIP8_TEST.V[5]);
        },

        Opcode_FX18: function() {
            CHIP8_TEST.reset();
            CHIP8_TEST.V[5] = 4;
            CHIP8_TEST.emulateOpcode(0xF518);
            return (CHIP8_TEST.soundTimer == CHIP8_TEST.V[5]);
        },

        Opcode_FX1E: function() {
            CHIP8_TEST.reset();
            CHIP8_TEST.V[5] = 4;
            CHIP8_TEST.I = 6;
            CHIP8_TEST.emulateOpcode(0xF51E);
            return (CHIP8_TEST.I == 10);
        },

        Opcode_FX29: function() {
            CHIP8_TEST.reset();
            CHIP8_TEST.V[5] = 4;
            CHIP8_TEST.emulateOpcode(0xF529);
            return (CHIP8_TEST.I == 4 * 0x5);
        },

        Opcode_FX33: function() {
            CHIP8_TEST.reset();
            CHIP8_TEST.V[5] = 128;
            CHIP8_TEST.emulateOpcode(0xF533);
            return (CHIP8_TEST.memory[CHIP8_TEST.I    ] == 1 &&
                    CHIP8_TEST.memory[CHIP8_TEST.I + 1] == 2 &&
                    CHIP8_TEST.memory[CHIP8_TEST.I + 2] == 8);
        },

        Opcode_FX55: function() {
            CHIP8_TEST.reset();
            CHIP8_TEST.V[0] = 1;
            CHIP8_TEST.V[1] = 2;
            CHIP8_TEST.V[2] = 3;
            CHIP8_TEST.V[3] = 4;
            CHIP8_TEST.I = 0x100;
            CHIP8_TEST.emulateOpcode(0xF355);

            for (let i = 0; i <= 3; i++) {
                if (CHIP8_TEST.memory[0x100 + i] != CHIP8_TEST.V[i])
                    return false;
            }

            return (CHIP8_TEST.I == 0x100 + 3 + 1);
        },

        Opcode_FX65: function() {
            CHIP8_TEST.reset();
            CHIP8_TEST.I = 0x100;
            CHIP8_TEST.memory[0x100] = 5;
            CHIP8_TEST.memory[0x101] = 6;
            CHIP8_TEST.memory[0x102] = 7;
            CHIP8_TEST.memory[0x103] = 8;
            CHIP8_TEST.emulateOpcode(0xF365);

            for (let i = 0; i <= 3; i++) {
                if (CHIP8_TEST.V[i] != CHIP8_TEST.memory[0x100 + i])
                    return false;
            }

            return (CHIP8_TEST.I == 0x100 + 3 + 1);
        }
};

module.exports = {};
module.exports.VIsEmpty = function VIsEmpty() {
  return (CHIP8_TEST.V.every(x=>x===0));
}

module.exports.lengthOfArrayV = function lengthOfArrayV(){
    return (CHIP8_TEST.V.length);
}