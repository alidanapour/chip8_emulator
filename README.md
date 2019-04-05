# Team 10 JS-Chip 8 Program

Instructions:

To run the webpage: 

1. Go to the `chip-8-webpage` folder, and open `index.HTML` in Google Chrome.
2. Select one of the ROMs from the drop-down menu to run. 
3. Load any chip8 rom via the `Load your ROM` button. We put legacy chip8 roms not written by us in a folder called `rom` and the roms written by us in the `games` folder.
4. While a program is running, the values of 21  registers will be displayed. A list of the latest 21 instructions is shown, and the current instruction highlighted in green. 
5. While a program is running user can: 
    - Pause the program 
    - Resume the program 
    - Step forward or backward one instruction at a time 
    - Reset the Emulator to its default state
    - Restart the current ROM (i.e., user doesn't have to reload their ROM ore-select a pre-load ROM from the drop-down menu to restart from ROM) 
    - Display the pop-up screen with description of the pre-load program selected from the drop-down menu and instructions on how to play the game.  
6. User can change the Emulator speed via the second drop-down, the default speed is 8 cycles/frames before or while the program runs. 
7. The `Use new shift opcodes` and `Use new load/store opcodes?` are added to support old ROMs. Please refer to the [list of known CHIP-8 programs that require special settings to run properly](https://github.com/tomdaley92/Kiwi8/issues/9) for more details. 
8. The `Fix timer speed?` checkbox is un-checked by default, user needs to check it to support the `Jumpy Rabbit` game. 

For Jest Automated testing:

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
- Important for Space Wars: Please **UN-check the `Fix timer speed?` checkbox** before loading the rom.

To run our game (`Jumpy Rabbit`): Please refer to the `README.md` in the `games\game2` folder.
 - Important for Jumpy Rabbit: Please set the speed to **40 cycles/second** and **CHECK the `Fix timer speed?` checkbox** before loading the rom.

Chip 8 Tool (`Sprite Editor`): **Please use a mouse for best user experience**
- Scroll down to reveal the Sprite Editor, scroll up to hide it, the current state of the Sprite Editor will be fully preserved.
- User left-click on the screen area add a sprite or right-click on the screen area to remove an existing sprite, the `Sprite Editor` will produce the corresponding hex values in the text box. To add or remove multiple sprites, hold and drag the cursor. 
- User can edit the hex values displayed in the text box area and the corresponding sprite(s) will be display on the screen
- User can also:
    - Reset the `Sprite Editor` (clear the screen and set the hex values to 0)
    - Move the existing sprites up/down/left/right