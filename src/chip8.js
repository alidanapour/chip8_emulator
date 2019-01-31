"use strict";

alert('chip8.js loaded'); 

// Using ES6:
class chip8{

    constructor(){
        this.V = null;              // V0 to VF
        this.register_I = null;     // Special 16-bit address register I
        this.memory = null;         // 4096 bytes
        this.pc = null;             // Program counter (16-bit) (programs start at 0x200)

        this.stack = null;          // Array of 16 16-bit Values
        this.stackPointer = null;   // Points to last element i.e. top of the stack
    
        this.keyPressed = null;	    // Key pressed
        this.delay = null;		    // Delay timer
        this.sound = null;			// Sound timer

        this.screen = null;         // The screen 64x32-pixel
    }

    reset(){
        this.V = new Uint8Array(16);
        this.register_I = 0;
        this.memory = new Uint8Array(4069);
        this.pc = 0x200;

        this.stack = new Array(16);
        this.stackPointer = -1;

        this.keyPressed = null;
        this.delay = 0;
        this.sound = 0;

        this.screen = new Array(64 * 32).fill(0); 
    }

    

}