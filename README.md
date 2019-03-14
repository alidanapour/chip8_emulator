# Team 10 JS-Chip 8 Program

Instructions:

To run the webpage: 

1. Go to the `chip-8-webpage` folder, and open `index.HTML` in Chrome.
2. Select one of the ROMs from the drop-down menu to run. **Please click anywhere within the screen area before playing**.
3. Load any chip8 rom vis the `Load ROM` button. We put legacy chip8 roms not written by us in a folder called `rom` and the roms written by us in the `games` folder.
4. While a program is running, the values of 21  registers will be displayed. A list of the latest 21 instructions is shown, and the current instruction highlighted in green. 
5. The user can click the `Description and How To Play` button for more details on any program in the drop-down menu, when you switch program from the drop-down menu, please click the `Description and How To Play` button twice to close and open it again to prevent information being cut-off. **We plan to use a pop-up screen in Release 4 instead of a drop-down field** 
6. The user can click the `Pause` button to pause the program and click `Continue` button to resume the program. 
7. The user can click the `Step Forward` and `Step Backward` button move one instruction forward or backward at a time. 
8. User can change the Emulator speed via the second drop-down, the default speed is 8 cycles/frames before or while the program runs. 
9. When the `Reset` button is click, the Emulator memory, register and speed to set to their original values. The instructions and register displays are cleared, but the test out put remain, since the test program acts on a different CPU object. 
10. The `Use new shift opcodes` and `Use new load/store opcodes?` are added to support old ROMs. Please refer to the [list of known CHIP-8 programs that require special settings to run properly](https://github.com/tomdaley92/Kiwi8/issues/9) for more details. 
11. The `Fix timer speed?` are selected by default to only changes the opcode execution speed.
12. For Jest Automated testing:

    a. Install [node.js](https://nodejs.org/en/), please also install `npm` while installing node.js on your local machine 

    b. un-zip `node_modules.zip`, the directory structure after un-zip node_modules.zip:

        cmpt276_chip8 
        |_____chip-8-webpage 
        |_____node_modules 
            |______folder1 
            |______folder2 ... 
        |_____other second-level subfolders 

    c. open the terminal

    d. type: `cd cmpt276_chip8/chip-8-webpage/tests`

    e. type: `npm run test`

To run our game (Space Wars): Please refer to the `README.md` in the `games\game1` folder.

To run our game (Jumpy Rabbit): Please refer to the `README.md` in the `games\game2` folder.
 - Important for Jumpy Rabbit: please set the speed to **30 cycles/second** before loading the rom.