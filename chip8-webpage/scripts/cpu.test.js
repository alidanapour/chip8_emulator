// Different types of "expects": https://jestjs.io/docs/en/expect 
var functions = require('./cpu');

test( 'Length of Array V is 16 ', ()=>{
	expect(functions.lengthOfArrayV()).toBe(16);
});

test( 'Array V is empty ', ()=>{
	expect(functions.vIsEmpty()).toBe(true);
});

test( 'I is 0 ', ()=>{
	expect(functions.iIsEmpty()).toBe(0);
});

test( 'Memory is 4096 bytes wide ', ()=>{
	expect(functions.memoryLength()).toBe(4096);
});

test( 'Memory is empty ', ()=>{
	expect(functions.memoryIsEmpty()).toBe(true);
});

test( 'Program counter starts at 0x200 ', ()=>{
	expect(functions.cpuPcValue()).toBe(0x200);
});

test( 'Stack length is 16 ', ()=>{
	expect(functions.cpuStackLength()).toBe(16);
});

test( 'Stack pointer is at 0 ', ()=>{
	expect(functions.cpuStackPointer()).toBe(0);
});

test( 'Delay timer is at 0 ', ()=>{
	expect(functions.cpuDelayTimer()).toBe(0);
});

test( 'Sound timer is at 0 ', ()=>{
	expect(functions.cpuSoundTimer()).toBe(0);
});

test( 'Display is 64x32 ', ()=>{
	expect(functions.cpuDisplayLength()).toBe(64*32);
});

test( 'Display is empty ', ()=>{
	expect(functions.cpuDisplayIsEmpty()).toBe(true);
});

test( 'Draw flag is false ', ()=>{
	expect(functions.cpuDrawFlag()).toBe(false);
});

test( 'Fonts have loaded ', ()=>{
	expect(functions.cpuLoadFonts()).toBe(true);
});

// OPCODES

test( 'Opcode 0x00E0 loaded ', ()=>{
	expect(functions.cpuOpcode_00E0()).toBe(true);
});

test( 'Opcode 0x00EE loaded ', ()=>{
	expect(functions.cpuOpcode_00EE()).toBe(true);
});

test( 'Opcode 0x1NNN loaded ', ()=>{
	expect(functions.cpuOpcode_1NNN()).toBe(true);
});

test( 'Opcode 0x2NNN loaded ', ()=>{
	expect(functions.cpuOpcode_2NNN()).toBe(true);
});

test( 'Opcode 0x3XKK loaded ', ()=>{
	expect(functions.cpuOpcode_3XKK()).toBe(true);
});

test( 'Opcode 0x4XKK loaded ', ()=>{
	expect(functions.cpuOpcode_4XKK()).toBe(true);
});

test( 'Opcode 0x5XY0 loaded ', ()=>{
	expect(functions.cpuOpcode_5XY0()).toBe(true);
});

test( 'Opcode 0x6XKK loaded ', ()=>{
	expect(functions.cpuOpcode_6XKK()).toBe(true);
});

test( 'Opcode 0x7XKK loaded ', ()=>{
	expect(functions.cpuOpcode_7XKK()).toBe(true);
});

test( 'Opcode 0x8XY0 loaded ', ()=>{
	expect(functions.cpuOpcode_8XY0()).toBe(true);
});

test( 'Opcode 0x8XY1 loaded ', ()=>{
	expect(functions.cpuOpcode_8XY1()).toBe(true);
});

test( 'Opcode 0x8XY2 loaded ', ()=>{
	expect(functions.cpuOpcode_8XY2()).toBe(true);
});

test( 'Opcode 0x8XY3 loaded ', ()=>{
	expect(functions.cpuOpcode_8XY3()).toBe(true);
});

test( 'Opcode 0x8XY4 loaded ', ()=>{
	expect(functions.cpuOpcode_8XY4()).toBe(true);
});

test( 'Opcode 0x8XY5 loaded ', ()=>{
	expect(functions.cpuOpcode_8XY5()).toBe(true);
});

test( 'Opcode 0x8XY6 loaded ', ()=>{
	expect(functions.cpuOpcode_8XY6()).toBe(true);
});

test( 'Opcode 0x8XY7 loaded ', ()=>{
	expect(functions.cpuOpcode_8XY7()).toBe(true);
});

test( 'Opcode 0x8XYE loaded ', ()=>{
	expect(functions.cpuOpcode_8XYE()).toBe(true);
});

test( 'Opcode 0x9XY0 loaded ', ()=>{
	expect(functions.cpuOpcode_9XY0()).toBe(true);
});

test( 'Opcode 0xANNN loaded ', ()=>{
	expect(functions.cpuOpcode_ANNN()).toBe(true);
});

test( 'Opcode 0xBNNN loaded ', ()=>{
	expect(functions.cpuOpcode_BNNN()).toBe(true);
});

test( 'Opcode 0xCXKK loaded ', ()=>{
	expect(functions.cpuOpcode_CXKK()).toBe(true);
});

test( 'Opcode 0xDXYN loaded ', ()=>{
	expect(functions.cpuOpcode_DXYN()).toBe(true);
});

test( 'Opcode 0xEX9E loaded ', ()=>{
	expect(functions.cpuOpcode_EX9E()).toBe(true);
});

test( 'Opcode 0xEXA1 loaded ', ()=>{
	expect(functions.cpuOpcode_EXA1()).toBe(true);
});

test( 'Opcode 0xFX07 loaded ', ()=>{
	expect(functions.cpuOpcode_FX07()).toBe(true);
});

test( 'Opcode 0xFX0A loaded ', ()=>{
	expect(functions.cpuOpcode_FX0A()).toBe(true);
});

test( 'Opcode 0xFX15 loaded ', ()=>{
	expect(functions.cpuOpcode_FX15()).toBe(true);
});

test( 'Opcode 0xFX18 loaded ', ()=>{
	expect(functions.cpuOpcode_FX18()).toBe(true);
});

test( 'Opcode 0xFX1E loaded ', ()=>{
	expect(functions.cpuOpcode_FX1E()).toBe(true);
});

test( 'Opcode 0xFX29 loaded ', ()=>{
	expect(functions.cpuOpcode_FX29()).toBe(true);
});

test( 'Opcode 0xFX33 loaded ', ()=>{
	expect(functions.cpuOpcode_FX33()).toBe(true);
});

test( 'Opcode 0xFX55 loaded ', ()=>{
	expect(functions.cpuOpcode_FX55()).toBe(true);
});

test( 'Opcode 0xFX65 loaded ', ()=>{
	expect(functions.cpuOpcode_FX65()).toBe(true);
});
