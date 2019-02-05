let CHIP8 = {
    V: new Uint8Array(16),          // V0 to Vf are 16 8-bit registers
    register_I: 0,                  // Special 16-bit address register I
    
    memory: new Uint8Array(4096),   // 4K (4096) bytes of memory
	pc: 0x200,                      // Program counter (16-bit) starts at 0x200 (512)

    stack: new Uint16Array(16),     // Array of 16 16-bit values
    stackPointer: -1,               // Points to the top of the stack

    delayTimer: 0,                  // Delay timer initialized to 0
	soundTimer: 0,                  // Sound timer initialized to 0
    isRunning: false,               // CPU run status
    
	screenWidth: 64,
	screenHeight: 32,
	display: new Array(64 * 32),

    reg_reset: function() {
        this.V = new Uint8Array(16);
    },

    mem_reset: function() {
        this.memory.fill(0);
    },
    
    display_reset: function() {
        this.display.fill(0);
    },
    
    loadCharacters: function() {
        let characterToStore = [
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
        
        let length = characterToStore.length;
        for (let i = 0; i < length; i++) {
            this.memory[i] = characterToStore[i];
        }
    },
    
    cpu_reset: function() {
        this.reg_reset();
        this.mem_reset();
        this.display_reset();
        this.loadCharacters();
        this.register_I = 0;
        this.pc = 0x200;
        this.stack = new Uint16Array(16);
        this.stackPointer = -1;
        this.delayTimer = 0;
        this.soundTimer = 0;
        this.isRunning = false;
    },
    
    loadProgram: function(program) {
        for (let i = 0; i < program.length; i++) {
            this.memory[this.pc + i] = program[i];
        }
    }
};

function emulateOpcode () {
	let code = CHIP8.memory[CHIP8.pc] << 8 | CHIP8.memory[CHIP8.pc + 1]; // 1111-2222-3333-4444
    let x = (code & 0x0F00) >>> 8;          // 0x00
    let y = (code & 0x00F0) >>> 4;          // 00y0
    let kk = code & 0x00FF;                 // 00kk
    let nnn = code & 0xFFF;					// 0nnn

	switch (code & 0xF000) {
		case 0x0000:
			
			switch (code & 0x00FF) {

				case 0x00E0:

					// 00E0 - CLS
					CHIP8.display.fill(0);
					break;

				case 0x00EE:

					// 00EE - RET
					CHIP8.pc = CHIP8.stack[CHIP8.stackPointer];
					CHIP8.stack.pop();
					CHIP8.stackPointer--;
					break;
			}

			break;

		case 0x1000:

			// 1nnn - JP addr
			CHIP8.pc = nnn;
			break;

		case 0x2000:

			// 2nnn - CALL addr
			CHIP8.stack.push(CHIP8.pc + 2);
			CHIP8.stackPointer++;
			CHIP8.pc = nnn;
			break;

		case 0x3000:

			// 3xkk - SE Vx, byte
			if (CHIP8.V[x] === kk)
				CHIP8.pc += 2;
			CHIP8.pc += 2;
			break;

		case 0x4000:

			// 4xkk - SNE Vx, byte
			if (CHIP8.V[x] !== kk)
				CHIP8.pc += 2;
			CHIP8.pc += 2;
			break;

		case 0x5000:

			// 5xy0 - SE Vx, Vy
			if (CHIP8.V[x] === CHIP8.V[y])
				CHIP8.pc += 2;
			CHIP8.pc += 2;
			break;

		case 0x6000:

			// 6xkk - LD Vx, byte
			CHIP8.V[x] = kk;
			CHIP8.pc += 2;
			break;

		case 0x7000:

			// 7xkk - ADD Vx, byte
			CHIP8.V[x] += kk;
			CHIP8.pc += 2;
			break;

		case 0x8000:

			switch (code & 0x000F) {

				case 0x0000:

					// 8xy0 - LD Vx, Vy
					CHIP8.V[x] = CHIP8.V[y];
					CHIP8.pc += 2;
					break;

				case 0x0001:

					// 8xy1 - OR Vx, Vy
					CHIP8.V[x] = CHIP8.V[x] | CHIP8.V[y];
					CHIP8.pc += 2;
					break;

				case 0x0002:

					// 8xy2 - AND Vx, Vy
					CHIP8.V[x] = CHIP8.V[x] & CHIP8.V[y];
					CHIP8.pc += 2;
					break;

				case 0x0003:

					// 8xy3 - XOR Vx, Vy
					CHIP8.V[x] = CHIP8.V[x] ^ CHIP8.V[y];
					CHIP8.pc += 2;
					break;

				case 0x0004:

					// 8xy4 - ADD Vx, Vy
                    let sum = CHIP8.V[x] + CHIP8.V[y];
                    if (sum > 0xff)
                        CHIP8.V[15] = 1;
                    else
                        CHIP8.V[15] = 0;
                    CHIP8.V[x] = sum;
					break;

				case 0x0005:

					// 8xy5 - SUB Vx, Vy
					if (CHIP8.V[x] > CHIP8.V[y])
                        CHIP8.V[15] = 1;           // Vf = Not Borrow
                    else
                        CHIP8.V[15] = 0;
                    CHIP8.V[x] -= CHIP8.V[y];
					CHIP8.pc += 2;
					break;

				case 0x0006:

                    // 8xy6 - SHR Vx {, Vy}
                    if (CHIP8.V[x] & 0x01)
                        CHIP8.V[15] = 1;
                    else
                        CHIP8.V[15] = 0;
                    CHIP8.V[x] = CHIP8.V[x] >>> 1;    // >> or >>>
                    break;

				case 0x0007:

					// 8xy7 - SUBN Vx, Vy
					if (CHIP8.V[y] > CHIP8.V[x])	    // Vf = Not Borrow
                        CHIP8.V[15] = 1;
                    else
                        CHIP8.V[15] = 0;
                    CHIP8.V[x] = CHIP8.V[y] - CHIP8.V[x];
					CHIP8.pc += 2;
					break;

				case 0x000E:

                    // 8xyE - SHL Vx {, Vy}
                    if (CHIP8.V[x] & 0x80)
                        CHIP8.V[15] = 1;
                    else
                        CHIP8.V[15] = 0;
                    CHIP8.V[x] = CHIP8.V[x] << 1;
                    break;
            
			}
		    break;

		case 0x9000:

			// 9xy0 - SNE Vx, Vy
			if (CHIP8.V[x] !== CHIP8.V[y])
				CHIP8.pc += 2;
			CHIP8.pc += 2;
			break;

		case 0xA000:

			// Annn - LD I, addr
			CHIP8.register_I = nnn;
			CHIP8.pc += 2;
			break;

		case 0xB000:

			// Bnnn - JP V0, addr
			CHIP8.pc = CHIP8.V[0] + nnn;
			break;

		case 0xC000:

			// Cxkk - RND Vx, byte
			let random_byte = Math.floor(Math.random() * 256);		// 0 to 255
			CHIP8.V[x] = random_byte & kk;
			CHIP8.pc += 2;
			break;

		case 0xD000:

			// Dxyn - DRW Vx, Vy, nibble
			break;

		case 0xE000:

			switch (code & 0x00FF) {

				case 0x009E:

					// Ex9E - SKP Vx
					if (CHIP8.keyPressed === CHIP8.V[x])
						CHIP8.pc += 2;
					CHIP8.pc += 2;
					break;

				case 0x00A1:

					// ExA1 - SKNP Vx
					if (CHIP8.keyPressed !== CHIP8.V[x])
						CHIP8.pc += 2;
					CHIP8.pc += 2;
					break;
			}

		case 0xF000:

			switch (code & 0x00FF) {

				case 0x0007:

					// Fx07 - LD Vx, DT
					CHIP8.V[x] = CHIP8.delay;
					CHIP8.pc += 2;
					break;

				case 0x000A:

					// Fx0A - LD Vx, K
					CHIP8.V[x] = CHIP8.keyPressed;
					CHIP8.pc += 2;
					break;

				case 0x0015:

					// Fx15 - LD DT, Vx
                    CHIP8.delay = CHIP8.V[x];
                    CHIP8.pc += 2;
					break;

				case 0x0018:

					// Fx18 - LD ST, Vx
                    CHIP8.sound = CHIP8.V[x];
                    CHIP8.pc += 2;
					break;

				case 0x001E:

                    // Fx1E - ADD I, Vx
                    CHIP8.register_I += CHIP8.V[x];
                    CHIP8.pc += 2;
					break;

				case 0x0029:

                    // Fx29 - LD F, Vx
                    CHIP8.register_I = CHIP8.V[x] * 5;
                    CHIP8.pc += 2;
					break;

				case 0x0033:

					// Fx33 - LD B, Vx
					break;

				case 0x0055:

                    // Fx55 - LD [I], Vx
                    for (let i = 0; i <= x; i++) {
                        CHIP8.memory[CHIP8.register_I + i] = CHIP8.V[i];
                    }
                    CHIP8.pc += 2;
					break;

				case 0x0065:

                    // Fx65 - LD Vx, [I]
                    for (let i = 0; i <= x; i++) {
                        CHIP8.V[i] = CHIP8.memory[CHIP8.register_I + i];
                    }
                    CHIP8.pc += 2;
					break;

			}

            break;
            // no default case (is it needed?)
    }
}