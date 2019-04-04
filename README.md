# Team 10 JS-Chip 8 Program

Instructions:

To run the webpage: 

1. Go to the `chip-8-webpage` folder, and open `index.HTML` in Google Chrome.
2. Select one of the ROMs from the drop-down menu to run. **Please click anywhere within the screen area before playing**.
3. Load any chip8 rom via the `Load your ROM` button. We put legacy chip8 roms not written by us in a folder called `rom` and the roms written by us in the `games` folder.
4. While a program is running, the values of 21  registers will be displayed. A list of the latest 21 instructions is shown, and the current instruction highlighted in green. 
5. The user can click the `How To Play` button for more details on any pre-loaded program in the drop-down menu.
6. The user can click the `Pause` button to pause the program and click `Continue` button to resume the program. 
7. The user can click the `Step Forward` and `Step Backward` button move one instruction forward or backward at a time. 
8. User can change the Emulator speed via the second drop-down, the default speed is 8 cycles/frames before or while the program runs. 
9. When the `Reset` button is click, the Emulator memory, register and speed to set to their original values. The instructions and register displays are cleared, but the test out put remain, since the test program acts on a different CPU object. 
10. The `Use new shift opcodes` and `Use new load/store opcodes?` are added to support old ROMs. Please refer to the [list of known CHIP-8 programs that require special settings to run properly](https://github.com/tomdaley92/Kiwi8/issues/9) for more details. 
11. The `Fix timer speed?` checkbox are un-checked by default, user needs to check it to support the `Jumpy Rabbit` game. 
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

To run our game (`Space Wars`): Please refer to the `README.md` in the `games\game1` folder.

To run our game (`Jumpy Rabbit`): Please refer to the `README.md` in the `games\game2` folder.
 - Important for Jumpy Rabbit: Please set the speed to **40 cycles/second** and **check the `Fix timer speed?` checkbox** before loading the rom.

 Chip 8 Tool (`Sprite Editor`): **Please use a mouse for best user experience**
    - Scroll down to reveal the Sprite Editor, scroll up to hide it, the current state of the Sprite Editor will be fully preserved.
    - User left-click on the screen area add a sprite or right-click on the screen area to remove an existing sprite, the `Sprite Editor` will produce the corresponding hex values in the text box. To add or remove multiple sprites, hold and drag the cursor. 
    - User can edit the hex values displayed in the text box area and the corresponding sprite(s) will be display on the screen
    - User can also:
        - Reset the `Sprite Editor` (clear the screen and set the hex values to 0)
        - Move the existing sprites up/down/left/right