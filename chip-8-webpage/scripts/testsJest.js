const CPU = require('./cpu');

let CHIP8_TEST = new CPU();

module.exports = {};

module.exports.lengthOfArrayV = function lengthOfArrayV(){
    return (CHIP8_TEST.V.length);
}

module.exports.vIsEmpty = function vIsEmpty() {
    return (CHIP8_TEST.V.every(x=>x===0));
}

module.exports.iIsEmpty = function VIsEmpty() {
    return (CHIP8_TEST.I);
}

module.exports.memoryLength = function memoryLength(){
    return ( CHIP8_TEST.memory.length);
}

module.exports.memoryIsEmpty = function memoryIsEmpty(){
    return (CHIP8_TEST.memory.every(x=>x===0));
}

module.exports.cpuPcValue = function cpuPcValue(){
    CHIP8_TEST.reset();
    return (CHIP8_TEST.PC);
}

module.exports.cpuStackLength = function cpuStackLength(){
    return (CHIP8_TEST.stack.length);
}

module.exports.cpuStackPointer = function cpuStackPointer(){
    return (CHIP8_TEST.stackPointer);
}

module.exports.cpuDelayTimer = function cpuDelayTimer(){
    return (CHIP8_TEST.delayTimer);
}

module.exports.cpuSoundTimer = function cpuSoundTimer(){
    return (CHIP8_TEST.soundTimer);
}

module.exports.cpuDisplayLength = function cpuDisplayLength(){
    return (CHIP8_TEST.display.length);
}

module.exports.cpuDisplayIsEmpty = function cpuDisplayIsEmpty(){
    return (CHIP8_TEST.display.every(x => x === 0));
}

module.exports.cpuDrawFlag = function cpuDrawFlag(){
    return (CHIP8_TEST.drawFlag);
}

module.exports.cpuLoadFonts = function cpuLoadFonts() {
    CHIP8_TEST.loadFonts();
    let len = CHIP8_TEST.fontsToStore.length;
    for (let i = 0; i < len; i++) {
        if (CHIP8_TEST.memory[i] !== CHIP8_TEST.fontsToStore[i])
            return false;
    }
    return true;
}

//OPCODE TESTS
module.exports.cpuOpcode_00E0 = function cpuOpcode_00E0() {
    CHIP8_TEST.reset();
    CHIP8_TEST.emulateOpcode(0x00E0);
    return (CHIP8_TEST.PC== 514);
}

module.exports.cpuOpcode_00EE = function cpuOpcode_00EE() {
    CHIP8_TEST.reset();
    CHIP8_TEST.stack[CHIP8_TEST.stackPointer++] = 0xFF;
    CHIP8_TEST.emulateOpcode(0x00EE);
    if((CHIP8_TEST.stackPointer == 0)){
        return (CHIP8_TEST.PC == 0xFF);
    }
}

module.exports.cpuOpcode_1NNN = function cpuOpcode_1NNN() {
    CHIP8_TEST.reset();
    CHIP8_TEST.emulateOpcode(0x1F02);
    return (CHIP8_TEST.PC == 0x0F02);
}

module.exports.cpuOpcode_2NNN = function cpuOpcode_2NNN() {
    CHIP8_TEST.reset();
    CHIP8_TEST.emulateOpcode(0x2F02);
    return (CHIP8_TEST.stack[0] == 514 && CHIP8_TEST.stackPointer === 1 &&
        CHIP8_TEST.PC === 0x0F02);
}

module.exports.cpuOpcode_3XKK = function cpuOpcode_3XKK() {
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
}

module.exports.cpuOpcode_4XKK = function cpuOpcode_4XKK() {
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
}

module.exports.cpuOpcode_5XY0 = function cpuOpcode_5XY0() {
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
}

module.exports.cpuOpcode_6XKK = function cpuOpcode_6XKK() {
    CHIP8_TEST.reset();
    CHIP8_TEST.emulateOpcode(0x6111);
    return (CHIP8_TEST.V[1] == 0x11);
}

module.exports.cpuOpcode_7XKK = function cpuOpcode_7XKK() {
    CHIP8_TEST.reset();
    CHIP8_TEST.V[1] = 0x2;
    CHIP8_TEST.emulateOpcode(0x7111);
    return (CHIP8_TEST.V[1] == (0x2 + 0x11));
}

module.exports.cpuOpcode_8XY0 = function cpuOpcode_8XY0() {
    CHIP8_TEST.reset();
    CHIP8_TEST.V[1] = 5;
    CHIP8_TEST.V[2] = 8;
    CHIP8_TEST.emulateOpcode(0x8120);
    return (CHIP8_TEST.V[1] == 8);
}
module.exports.cpuOpcode_8XY1 = function cpuOpcode_8XY1() {
    CHIP8_TEST.reset();
    CHIP8_TEST.V[1] = 5;
    CHIP8_TEST.V[2] = 8;
    CHIP8_TEST.emulateOpcode(0x8121);
    return (CHIP8_TEST.V[1] == (5 | 8));
}

module.exports.cpuOpcode_8XY2 = function cpuOpcode_8XY2() {
    CHIP8_TEST.reset();
    CHIP8_TEST.V[1] = 5;
    CHIP8_TEST.V[2] = 8;
    CHIP8_TEST.emulateOpcode(0x8122);
    return (CHIP8_TEST.V[1] == (5 & 8));
}

module.exports.cpuOpcode_8XY3 = function cpuOpcode_8XY3() {
    CHIP8_TEST.reset();
    CHIP8_TEST.V[1] = 5;
    CHIP8_TEST.V[2] = 8;
    CHIP8_TEST.emulateOpcode(0x8123);
    return (CHIP8_TEST.V[1] == (5 ^ 8));
}

module.exports.cpuOpcode_8XY4 = function cpuOpcode_8XY4() {
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
}

module.exports.cpuOpcode_8XY5 = function cpuOpcode_8XY5() {
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
}

module.exports.cpuOpcode_8XY6 = function cpuOpcode_8XY6() {
    CHIP8_TEST.reset();
    CHIP8_TEST.V[1] = 2; // 0000-0010
    CHIP8_TEST.emulateOpcode(0x8106);
    if ((CHIP8_TEST.V[0xF] == 1) || (CHIP8_TEST.V[1] != (2 >>> 1)))
        return false;

    CHIP8_TEST.reset();
    CHIP8_TEST.V[1] = 3; // 0000-0011
    CHIP8_TEST.emulateOpcode(0x8106);
    if ((CHIP8_TEST.V[0xF] == 0) || (CHIP8_TEST.V[1] != (3 >>> 1)))
        return false;

    return true;
}

module.exports.cpuOpcode_8XY7 = function cpuOpcode_8XY7() {
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
}

module.exports.cpuOpcode_8XYE = function cpuOpcode_8XYE() {
    CHIP8_TEST.reset();
    CHIP8_TEST.V[1] = 2;    // 0000-0010
    CHIP8_TEST.emulateOpcode(0x810E);
    if ((CHIP8_TEST.V[0xF] == 1) || (CHIP8_TEST.V[1] != ((2 << 1) & 0xFF)))
        return false;

    CHIP8_TEST.reset();
    CHIP8_TEST.V[1] = 128;  // 1000-0000
    CHIP8_TEST.emulateOpcode(0x810E);
    if ((CHIP8_TEST.V[0xF] == 0) || (CHIP8_TEST.V[1] != ((128 << 1) & 0xFF)))
        return false;

    return true;
}

module.exports.cpuOpcode_9XY0 = function cpuOpcode_9XY0() {
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
}

module.exports.cpuOpcode_ANNN = function cpuOpcode_ANNN() {
    CHIP8_TEST.reset();
    CHIP8_TEST.emulateOpcode(0xAF10);
    return (CHIP8_TEST.I == 0xF10);
}

module.exports.cpuOpcode_BNNN = function cpuOpcode_BNNN() {
    CHIP8_TEST.reset();
    CHIP8_TEST.V[0] = 0x5;
    CHIP8_TEST.emulateOpcode(0xBF10);
    return (CHIP8_TEST.PC == (CHIP8_TEST.V[0] + 0xF10));
}

module.exports.cpuOpcode_CXKK = function cpuOpcode_CXKK() {
    CHIP8_TEST.reset();
    CHIP8_TEST.emulateOpcode(0xC100);
    if (CHIP8_TEST.V[1] != 0)
        return false;

    CHIP8_TEST.reset();
    CHIP8_TEST.emulateOpcode(0xC101);
    if (CHIP8_TEST.V[1] > 1)
        return false;

    return true;
}
module.exports.cpuOpcode_DXYN = function cpuOpcode_DXYN() {
    CHIP8_TEST.reset();
    CHIP8_TEST.memory[0] = 0x01;
    CHIP8_TEST.emulateOpcode(0xD001);
    return (CHIP8_TEST.display[7] == 1 && CHIP8_TEST.drawFlag == true);
}

module.exports.cpuOpcode_EX9E = function cpuOpcode_EX9E() {
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
}

module.exports.cpuOpcode_EXA1 = function cpuOpcode_EXA1() {
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
}

module.exports.cpuOpcode_FX07 = function cpuOpcode_FX07() {
    CHIP8_TEST.reset();
    CHIP8_TEST.delayTimer = 0xF;
    CHIP8_TEST.V[5] = 4;
    CHIP8_TEST.emulateOpcode(0xF507);
    return (CHIP8_TEST.V[5] == CHIP8_TEST.delayTimer);
}

module.exports.cpuOpcode_FX0A = function cpuOpcode_FX0A() {
    CHIP8_TEST.reset();
    CHIP8_TEST.V[5] = 4;
    CHIP8_TEST.keyPressed = 0xA;
    CHIP8_TEST.emulateOpcode(0xF50A);
    return (CHIP8_TEST.V[5] != CHIP8_TEST.keyPressed);  //!
}

module.exports.cpuOpcode_FX15 = function cpuOpcode_FX15() {
    CHIP8_TEST.reset();
    CHIP8_TEST.V[5] = 4;
    CHIP8_TEST.emulateOpcode(0xF515);
    return (CHIP8_TEST.delayTimer == CHIP8_TEST.V[5]);
}

module.exports.cpuOpcode_FX18 = function cpuOpcode_FX18() {
    CHIP8_TEST.reset();
    CHIP8_TEST.V[5] = 4;
    CHIP8_TEST.emulateOpcode(0xF518);
    return (CHIP8_TEST.soundTimer == CHIP8_TEST.V[5]);
}

module.exports.cpuOpcode_FX1E = function cpuOpcode_FX1E() {
    CHIP8_TEST.reset();
    CHIP8_TEST.V[5] = 4;
    CHIP8_TEST.I = 6;
    CHIP8_TEST.emulateOpcode(0xF51E);
    return (CHIP8_TEST.I == 10);
}

module.exports.cpuOpcode_FX29 = function cpuOpcode_FX29() {
    CHIP8_TEST.reset();
    CHIP8_TEST.V[5] = 4;
    CHIP8_TEST.emulateOpcode(0xF529);
    return (CHIP8_TEST.I == 4 * 0x5);
}

module.exports.cpuOpcode_FX33 = function cpuOpcode_FX33() {
    CHIP8_TEST.reset();
    CHIP8_TEST.V[5] = 128;
    CHIP8_TEST.emulateOpcode(0xF533);
    return (CHIP8_TEST.memory[CHIP8_TEST.I] == 1 &&
        CHIP8_TEST.memory[CHIP8_TEST.I + 1] == 2 &&
        CHIP8_TEST.memory[CHIP8_TEST.I + 2] == 8);
}

module.exports.cpuOpcode_FX55 = function cpuOpcode_FX55() {
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

    if (CHIP8_TEST.newLoadStoreQuirk)
        return (CHIP8_TEST.I == 0x100);
    else
        return (CHIP8_TEST.I == 0x100 + 3 + 1);
}

module.exports.cpuOpcode_FX65 = function cpuOpcode_FX65() {
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

    if (CHIP8_TEST.newLoadStoreQuirk)
        return (CHIP8_TEST.I == 0x100);
    else
        return (CHIP8_TEST.I == 0x100 + 3 + 1);
}