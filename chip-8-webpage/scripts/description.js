// Descriptions /////////////////////////////////////////////////////////////////////

let des15PUZZLE = "Here is the infamous 15 puzzle for Chip8. The puzzle, as you doubtless recall, has 15 squares numbered 1 through 15 (in this case, 1 through F) and one hole. You can move the hole about and must put the pieces in order. When you first run puzzle, it comes up solved. The program does not check to see if you’ve solved the puzzle, and therefore nothing special happens when you do except for the warm, fuzzy feeling that you have beaten it."
let desBLINKY = "Blinky is a PacMan game for the Chip8. As Blinky, you are chased around in an office environment by two bosses, Packlett and Heward. Packlett does management by walking around, but Heward believes in the American dream, and possesses quite a killer instinct. Anyway, don’t let them get to you, unless you are feeling very aspirant. This, of course, requires the recent fulfilment of one of four major contracts, found near the corners of the building. Otherwise, the office is filled with small tasks, just waiting for your attention. If you manage to take care of them all, your intray will overflow, just over weekend. This is the curse of any responsible and hard working employee. However, neither boss know of the emergency exit which leads from one part of the office to the other, so this may be one way to avoid them, if everything else fails."
let desBLITZ = "This game is a BOMBER clone. You are in a plane, and you must destroy the towers of a town. Your plane is flying left to right, and goes down. The game ends when you crash yourself on a tower..."
let desBRIX = "This is a version of the classic game of knock out the bricks. Moved the platform to keep the ball up. Once the ball hits a brick it disappears. Goal is to destory all bricks"
let desCGG = "Not really a game... Just some cool animations!"
let desCONNECT4 = "This game is for two players. The goal is to align 4 coins in the game area. Each player’s coins are colored. When you drop a coin, it is paced on the latest dropped coin in the same column, or at the bottom if the column is empty. Once the column is full, you cannot place any more coins in it."
let desGUESS = "Think to a number between 1 and 63. CHIP8 shows you several boards and you have to tell if you see your number in them. Press 5 if so, or another key if not. CHIP8 gives you the number."
let desHIDDEN = "This is a version of the classic memory game. You are asked to find pairs of cards."
let desINVADERS = "The well known game. Destroy the invaders with your ship."
let desKALEID = "Make cool looking pictures!"
let desMAZE = "Draws random mazes"
let desMERLIN = "This little This is the Simon game. The goal is to remember in which order the squares are lighted. The game begins by lighting 4 random squares, and then asks you to light the squares in the correct order. You win a level when you give the exact order, and each increasing level shows a additionnal square. The game ends when you light an incorrect square. "
let desMISSILE = "You must shoot the 8 targets on the screen. Your shooter moves a little bit faster each time you shoot. You have 12 missiles to shoot all the targets, and you win 5 points per target shot"
let desPONG = "Literally who doesn't know pong. Only thing is that the game doesn't end... ever. The score just keeps counting up, and only reaches 9, then rolls to 0 again."
let desPONG2 = "PONG... but better!"
let desPUZZLE = "Here is the infamous 15 puzzle for Chip8. The puzzle, as you doubtless recall, has 15 squares numbered 1 through 15 (in this case, 1 through F) and one hole. You can move the hole about and must put the pieces in order. When you first run puzzle, it comes up solved. The program does not check to see if you’ve solved the puzzle, and therefore nothing special happens when you do except for the warm, fuzzy feeling that you have beaten it."
let desSFACES = "Draws smiley faces onto the screen! What more could you ask for :)"
let desSPACEWARS = "Move your ship in this intense hyper-realistic space battle simulator. The AI is smart enough to beat you, but also smart enough to let you win sometimes so you don't get discouraged ;)-- Too easy? Crank up the cyles/frames to 100!"
let desSYZYGY = "The object of the game is to seek out the targets. You do this with your syzygy. Initially small, the syzygy will grow by some amount each time a target is hit. Eventually, your syzygy will be so long as to make tougher and tougher to get any points (and easier and easier to get killed). Play it and you'll know what we're talking about."
let desTANK = "You have 20 missles to shoot at the bad guys. One of the claaaaaassics."
let desTETRIS = "Literally TETRIS"
let desTICTAC = "Tic-Tac-Toe... Surely you've played it before"
let desUFO = "You have 15 missiles to shoot on the two types of invaders. The big one moves on the left and gives you 5 points. The small one moves on the right at variant speeds. The game ends after having shot the 15 missiles."
let desVBRIX = "This is a version of the classic game of knock out the bricks."
let desVERS = "There are two players, each controls a worm. The idea is to have the longest worm. First to 8 points wins!"
let desWIPEOFF = "Another BRIX variant, but quite hard to play. Your score is shown when you lose all your lives"

let decArray = [des15PUZZLE, desBLINKY, desBLITZ, desBRIX, desCGG, desCONNECT4, desGUESS, desHIDDEN, desINVADERS,
                desKALEID, desMAZE, desMERLIN, desMISSILE, desPONG, desPONG2, desPUZZLE, desSFACES, desSPACEWARS,
                desSYZYGY, desTANK, desTETRIS, desTICTAC, desUFO, desVBRIX, desVERS, desWIPEOFF];

let gameArray = ["15PUZZLE", "BLINKY", "BLITZ", "BRIX", "CGG", "CONNECT4", "GUESS", "HIDDEN", "INVADERS", "KALEID",
                "MAZE", "MERLIN", "MISSILE", "PONG", "PONG2", "PUZZLE", "SFACES", "SPACEWARS", "SYZYGY", "TANK",
                "TETRIS", "TICTAC", "UFO", "VBRIX", "VERS", "WIPEOFF"];

// Controls /////////////////////////////////////////////////////////////////////////

let con15PUZZLE = "<br/>1234<br/>QWER<br/>ASDF<br/>ZXCV<br/> Use all the buttons for moving the puzzle pieces!"
let conBLINKY = "<br/>1-3-<br/>--E-<br/>AS--<br/>----<br/> 1: reset<br/>3: up<br/>E: down<br/>A: left<br/>S: right"
let conBLITZ = "<br/>----<br/>-W--<br/>----<br/>----<br/> W: Drop bomb"
let conBRIX = "<br/>----<br/>-W--<br/>----<br/>----<br/> Q: move paddle left<br/>E: Move paddle right"
let conCGG = "<br/>----<br/>Q-E-<br/>-----<br/>----<br/> No controls, just enjoy the amazing visuals!"
let conCONNECT4 = "<br/>----<br/>QWE-<br/>----<br/>----<br/> Q: left<br/>W: place piece<br/>E: right"
let conGUESS = "<br/>----<br/>QW--<br/>----<br/>----<br/> Q: no<br/>W: yes"
let conHIDDEN = "<br/>-2--<br/>QWE-<br/>-S--<br/>----<br/> 2: up<br/>Q: left<br/>W: pick<br/>E: right<br/>S: down"
let conINVADERS = "<br/>----<br/>QWE-<br/>----<br/>-----<br/>Q: left<br/>W: fire<br/>E: right"
let conKALEID = "<br/>-2--<br/>Q-E-<br/>-S--<br/>-X--<br/>X: finish<br/>2: up<br/>Q: left<br/>E: right<br/>S: down"
let conMAZE = "<br/>----<br/>----<br/>----<br/>----<br/> No controls, just enjoy the amazing visuals!"
let conMERLIN = "<br/>----<br/>Q-E-<br/>----<br/>----<br/> Q: left<br/>E: right"
let conMISSILE = "<br/>----<br/>----<br/>-S--<br/>----<br/> S: fire"
let conPONG = "<br/>1--4<br/>Q--R<br/>----<br/>----<br/> 1: move left paddle Q: move left paddle down<br/>4: move right paddle up R: move right paddle down"
let conPONG2 = "<br/>1--4<br/>Q--R<br/>----<br/>----<br/> 1: move left paddle Q: move left paddle down<br/>4: move right paddle up R: move right paddle down"
let conPUZZLE = "<br/>1234<br/>QWER<br/>ASDF<br/>ZXCV<br/> Use all the buttons for moving the puzzle pieces!"
let conSFACES = "<br/>----<br/>Q-E-<br/>-----<br/>----<br/> No controls, just enjoy the amazing visuals!>"
let conSPACEWARS = "<br/>-----<br/>-WE-<br/>ASD-<br/>----<br/> W: move up<br/>A: move left<br/>S: move down<br/>D: move right<br/>E: start"
let conSYZYGY = "<br/>--3-<br/>--E-<br/>AS-F<br/>--CV<br/> 3: up<br/>E: down<br/>A: left<br/>S: right<br/>C: show score<br/>F: no border<br/>V: border"
let conTANK = "<br/>-2--<br/>QWE-<br/>-S--<br/>----<br/> 2: up<br/>Q: left<br/>W: fire<br/>E: right<br/>S: down"
let conTETRIS = "<br/>----<br/>QWE-<br/>A---<br/>----<br/> Q: rotate<br/>W: left<br/>E: right<br/>A: drop piece"
let conTICTAC = "<br/>123-<br/>QWE-<br/>ASD-<br/>----<br/> 1-D: select corresponding square"
let conUFO = "<br/>----<br/>QWE-<br/>----<br/>-----<br/> Q: shoot left<br/>W: shoot up<br/>E: shoot right"
let conVBRIX = "<br/>----<br/>-W--<br/>----<br/>----<br/> Q: move paddle left<br/>E: Move paddle right"
let conVERS = "<br/>12-4<br/>---R<br/>A---<br/>Z-CV<br/> 1: player1 left 2: player1 right A player1 up Z: player1 down<br/>C: player2 left 4: player2 up R: player 2 down V: player 2 right"
let conWIPEOFF = "<br/>----<br/>Q-E-<br/>----<br/>----<br/> Q: move paddle left<br/>E: move paddle right"

let conArray = [con15PUZZLE, conBLINKY, conBLITZ, conBRIX, conCGG, conCONNECT4, conGUESS, conHIDDEN, conINVADERS,
                conKALEID, conMAZE, conMERLIN, conMISSILE, conPONG, conPONG2, conPUZZLE, conSFACES, conSPACEWARS,
                conSYZYGY, conTANK, conTETRIS, conTICTAC, conUFO, conVBRIX, conVERS, conWIPEOFF];

// For the description
let coll = document.getElementsByClassName("descriptionButton");
for (let i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function() {
        this.classList.toggle("active");
        var content = this.nextElementSibling;
        if (content.style.maxHeight)
            content.style.maxHeight = null;
        else
            content.style.maxHeight = content.scrollHeight + "px"; });
}

function description(game) {
	let gameIndex = gameArray.indexOf(game);
	document.getElementById("description").innerHTML = decArray[gameIndex] + "<br/>" + conArray[gameIndex];
}
