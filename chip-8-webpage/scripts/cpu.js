"use strict";

class CPU {
    
    constructor() {

        this.V = new Uint8Array(16);            // V0 to Vf are the 16 8-bit registers
        this.I = 0;                             // Special 16-bit address register I
        this.memory = new Uint8Array(4096);     // 4K (4096) bytes of memory
        this.PC = 0x200;                        // Program counter (16-bit) starts at 0x200 (512)
        this.stack = new Uint16Array(16);       // Array of 16 16-bit values
        this.stackPointer = 0;                  // Points to the top of the stack

        this.delayTimer = 0;                    // Delay timer initialized to 0
        this.soundTimer = 0;                    // Sound timer initialized to 0

        this.screenWidth = 64;
        this.screenHeight = 32;
        this.display = new Uint8Array(this.screenWidth * this.screenHeight); // Video memory, used to draw frames
        this.drawFlag = false;                  // Tells whether to draw

        this.keys = new Uint8Array(16);         // Stores the status of the keys

        this.isRunning = false;                 // CPU run status

        this.newShiftQuirk = true;              // Use new shift definitions (affects 8XY6 & 8XYE) by default
        this.newLoadStoreQuirk = true;          // Use new load/store definitions (affects FX55 & FX65) by default

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

    loadFonts() {

        let length = this.fontsToStore.length;

        for(let i = 0; i < length; i++){
            this.memory[i] = this.fontsToStore[i]
        }

    } // End of loadFonts()

    reset() {

        this.V.fill(0);			                        // Clear registers
	    this.memory.fill(0);		                    // Clear RAM
	    this.display.fill(0);		                    // Clear memory
	    this.loadFonts();			                    // Load font set
	    this.I = 0;				                        // Clear register I
        this.PC = 0x200;			                    // PC starts at 0x200 (512)
	    this.stack.fill(0);	                            // Clear program stack
	    this.stackPointer = 0;		                    // Clear stack pointer
	    this.delayTimer = 0;		                    // Clear delay timer
	    this.soundTimer = 0;		                    // Clear sound timer
	    this.isRunning = false;	                        // Set CPU run status to false
        this.keys.fill(0);			                    // Clear keys
        this.drawFlag = false;		                    // Don't draw anything

    } // End of reset()

    setTimer() {

        if (this.delayTimer > 0) {
            this.delayTimer--;
        }

	    if (this.soundTimer > 0) {
            this.soundTimer--;
        }

    } // End of setTimer()

    renderScreen() {

        if (this.drawFlag === false)
            return;

        const canvas = document.getElementById("screen-area");
        const screen = canvas.getContext("2d");
        screen.clearRect(0, 0, this.screenWidth * 10, this.screenHeight * 10);

        for (let y = 0; y < this.screenHeight; y++) {
            for (let x = 0; x < this.screenWidth; x++) {
                if (this.display[x + (y * this.screenWidth)])
                    screen.fillRect(x * 10, y * 10, 10, 10);
            }
        }

        this.drawFlag = false;
    } // End of renderScreen()

    setKeyDown(key) {
        this.keys[key] = true;
    }   // End of setKeyDown(key)

    setKeyUp(key) {
        this.keys[key] = false;
    }   // End of setKeyUp(key)

    loadProgram(rom) {

        let reader = new FileReader();

        reader.addEventListener("loadend", function(){
            let buffer = new Uint8Array(reader.result);
            
            for (let i = 0; i < buffer.length; i++) {
                CHIP8.memory[CHIP8.PC + i] = buffer[i];
            }

        });

        reader.readAsArrayBuffer(rom);

    } // End of loadProgram()

    // Opcode implementations
    emulateOpcode(opcode) {
        let code = opcode; 						// 1111-2222-3333-4444
        let x = (code & 0x0F00) >>> 8;          // 0x00
        let y = (code & 0x00F0) >>> 4;          // 00y0
        let kk = code & 0x00FF;                 // 00kk
        let nnn = code & 0x0FFF;				// 0nnn

        switch (code & 0xF000) {
            case 0x0000:

                switch (code & 0x00FF) {

                    case 0x00E0:

                        // 00E0 - CLS
                        // Clear the display
                        this.display.fill(0);
                        this.PC += 2;
                        this.drawFlag = true;
                        break;

                    case 0x00EE:

                        // 00EE - RET
                        // Return from a subroutine
                        this.stackPointer--;
                        this.PC = this.stack[this.stackPointer];
                        break;

                }
                
                break;

            case 0x1000:

                // 1nnn - JP addr
                // Jump to location nnn
                this.PC = nnn;
                break;

            case 0x2000:

                // 2nnn - CALL addr
                // Call subroutine at nnn
                this.stack[this.stackPointer] = this.PC + 2;
                this.stackPointer++;
                this.PC = nnn;
                break;

            case 0x3000:

                // 3xkk - SE Vx, byte
                // Skip next instruction if Vx = kk
                if (this.V[x] == kk)
                    this.PC += 2;
                this.PC += 2;
                break;

            case 0x4000:

                // 4xkk - SNE Vx, byte
                // Skip next instruction if Vx != kk
                if (this.V[x] != kk)
                    this.PC += 2;
                this.PC += 2;
                break;

            case 0x5000:

                // 5xy0 - SE Vx, Vy
                // Skip next instruction if Vx = Vy
                if (this.V[x] == this.V[y])
                    this.PC += 2;
                this.PC += 2;
                break;

            case 0x6000:

                // 6xkk - LD Vx, byte
                // Set Vx = kk
                this.V[x] = kk;
                this.PC += 2;
                break;

            case 0x7000:

                // 7xkk - ADD Vx, byte
                // Set Vx = Vx + kk
                this.V[x] += kk;
                this.PC += 2;
                break;

            case 0x8000:

                switch (code & 0x000F) {

                    case 0x0000:

                        // 8xy0 - LD Vx, Vy
                        // Set Vx = Vy
                        this.V[x] = this.V[y];
                        this.PC += 2;
                        break;

                    case 0x0001:

                        // 8xy1 - OR Vx, Vy
                        // Set Vx = Vx OR Vy
                        this.V[x] = this.V[x] | this.V[y];
                        this.PC += 2;
                        break;

                    case 0x0002:

                        // 8xy2 - AND Vx, Vy
                        // Set Vx = Vx AND Vy
                        this.V[x] = this.V[x] & this.V[y];
                        this.PC += 2;
                        break;

                    case 0x0003:

                        // 8xy3 - XOR Vx, Vy
                        // Set Vx = Vx XOR Vy
                        this.V[x] = this.V[x] ^ this.V[y];
                        this.PC += 2;
                        break;

                    case 0x0004:

                        // 8xy4 - ADD Vx, Vy
                        // Set Vx = Vx + Vy, set VF = carry
                        let sum = this.V[x] + this.V[y];
                        if (sum > 0xFF)
                            this.V[0xF] = 1;
                        else
                            this.V[0xF] = 0;
                        this.V[x] = sum & 0xFF;
                        this.PC += 2;
                        break;

                    case 0x0005:

                        // 8xy5 - SUB Vx, Vy
                        // Set Vx = Vx - Vy, set VF = NOT borrow
                        if (this.V[x] >= this.V[y])
                            this.V[0xF] = 1;           		// Vf = Not Borrow
                        else
                            this.V[0xF] = 0;
                        this.V[x] -= this.V[y];
                        this.PC += 2;
                        break;

                    case 0x0006:

                        // 8xy6 - SHR Vx {, Vy}
                        // Set Vx = Vx SHR 1
                        let registerToShift1 = this.newShiftQuirk ? this.V[x] : this.V[y];
                        if ((registerToShift1 & 0x01) === 0x00)
                            this.V[0xF] = 0;
                        else
                            this.V[0xF] = 1;
                        this.V[x] = (registerToShift1 / 2);
                        this.PC += 2;
                        break;

                    case 0x0007:

                        // 8xy7 - SUBN Vx, Vy
                        // Set Vx = Vy - Vx, set VF = NOT borrow
                        if (this.V[y] >= this.V[x])	        // Vf = Not Borrow
                            this.V[0xF] = 1;
                        else
                            this.V[0xF] = 0;
                        this.V[x] = this.V[y] - this.V[x];
                        this.PC += 2;
                        break;

                    case 0x000E:

                        // 8xyE - SHL Vx {, Vy}
                        // Set Vx = Vx SHL 1
                        let registerToShift2 = this.newShiftQuirk ? this.V[x] : this.V[y];
                        if ((registerToShift2 & 0x80) === 0x00)
                            this.V[0xF] = 0;
                        else
                            this.V[0xF] = 1;
                        this.V[x] = (registerToShift2 * 2);
                        this.PC += 2;
                        break;
                }
                break;

            case 0x9000:

                // 9xy0 - SNE Vx, Vy
                // Skip next instruction if Vx != Vy
                if (this.V[x] != this.V[y])
                    this.PC += 2;
                this.PC += 2;
                break;

            case 0xA000:

                // Annn - LD I, addr
                // Set I = nnn
                this.I = nnn;
                this.PC += 2;
                break;

            case 0xB000:

                // Bnnn - JP V0, addr
                // Jump to location nnn + V0
                this.PC = this.V[0] + nnn;
                break;

            case 0xC000:

                // Cxkk - RND Vx, byte
                // Set Vx = random byte AND kk
                let random_byte = Math.floor(Math.random() * 256);		// 0 to 255
                this.V[x] = random_byte & kk;
                this.PC += 2;
                break;

            case 0xD000:

                // Dxyn - DRW Vx, Vy, nibble
                // Display n-byte sprite starting at memory location I at (Vx, Vy), set VF = collision
                this.V[0xF] = 0;
                let n = code & 0x000F;
                for (let i = 0; i < n; i++) {                           // Draw n bytes
                    let byteToDraw = this.memory[this.I + i];
                    for (let j = 0; j < 8; j++) {                       // Draw each bit for that byte
                        if ((byteToDraw & (0x80 >> j)) != 0) {
                            if (this.display[((this.V[x] + j) % 64) + (((this.V[y] + i) % 32) * 64)] == 1)
                                this.V[0xF] = 1;                        // Collision detection
                            this.display[((this.V[x] + j) % 64) + (((this.V[y] + i) % 32) * 64)] ^= 1;
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
                        // Skip next instruction if key with the value of Vx is pressed
                        if (this.keys[this.V[x]] == true)
                            this.PC += 2;
                        this.PC += 2;
                        break;

                    case 0x00A1:

                        // ExA1 - SKNP Vx
                        // Skip next instruction if key with the value of Vx is not pressed
                        if (this.keys[this.V[x]] == false)
                            this.PC += 2;
                        this.PC += 2;
                        break;
                }

            case 0xF000:

                switch (code & 0x00FF) {

                    case 0x0007:

                        // Fx07 - LD Vx, DT
                        // Set Vx = delay timer value
                        this.V[x] = this.delayTimer;
                        this.PC += 2;
                        break;

                    case 0x000A:

                        // Fx0A - LD Vx, K
                        // Wait for a key press, store the value of the key in Vx
                        let waitingForKey = true;
                        for (let i = 0; i < this.keys.length; i++) {
                            if (this.keys[i]) {
                                this.V[x] = i;
                                waitingForKey = false;
                            }
                        }
                        if (!waitingForKey)             // Move to next instruction only when key recorded
                            this.PC += 2;
                        break;

                    case 0x0015:

                        // Fx15 - LD DT, Vx
                        // Set delay timer = Vx
                        this.delayTimer = this.V[x];
                        this.PC += 2;
                        break;

                    case 0x0018:

                        // Fx18 - LD ST, Vx
                        // Set sound timer = Vx
                        this.soundTimer = this.V[x];
                        this.PC += 2;
                        break;

                    case 0x001E:

                        // Fx1E - ADD I, Vx
                        // Set I = I + Vx
                        this.I += this.V[x];
                        this.PC += 2;
                        break;

                    case 0x0029:

                        // Fx29 - LD F, Vx
                        // Set I = location of sprite for digit Vx
                        this.I = this.V[x] * 0x5;   // Each sprite is 5 bytes long
                        this.PC += 2;
                        break;

                    case 0x0033:

                        // Fx33 - LD B, Vx
                        // Store BCD representation of Vx in memory locations I, I+1, and I+2
                        this.memory[this.I] = this.V[x] / 100;
                        this.memory[this.I + 1] = (this.V[x] / 10) % 10;
                        this.memory[this.I + 2] = (this.V[x] % 100) % 10;
                        this.PC += 2;
                        break;

                    case 0x0055:

                        // Fx55 - LD [I], Vx
                        // Store registers V0 through Vx in memory starting at location I
                        for (let i = 0; i <= x; i++) {
                            this.memory[this.I + i] = this.V[i];
                        }
                        if (!this.newLoadStoreQuirk)
                            this.I += x + 1;
                        this.PC += 2;
                        break;

                    case 0x0065:

                        // Fx65 - LD Vx, [I]
                        // Read registers V0 through Vx from memory starting at location I
                        for (let i = 0; i <= x; i++) {
                            this.V[i] = this.memory[this.I + i];
                        }
                        if (!this.newLoadStoreQuirk)
                            this.I += x + 1;
                        this.PC += 2;
                        break;

                }

                break;
            // no default case (is it needed?)
        }

    } // End of  emulateOpcode(opcode)

} // End of CPU class
