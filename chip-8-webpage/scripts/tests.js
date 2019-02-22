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
            CHIP8_TEST.keys[0x4] = true;
            CHIP8_TEST.emulateOpcode(0xF50A);
            return (CHIP8_TEST.keys[CHIP8_TEST.V[5]]);
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
            
            if (CHIP8_TEST.newLoadStoreQuirk)
                return (CHIP8_TEST.I == 0x100);    
            else
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

            if (CHIP8_TEST.newLoadStoreQuirk)
                return (CHIP8_TEST.I == 0x100);    
            else
                return (CHIP8_TEST.I == 0x100 + 3 + 1);
        }
};
