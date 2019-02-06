# Project: A JavaScript Chip8 System (JS-Chip8)

## Introduction 

**JS-Chip8** is a single-page JavaScript web application. It supports two browsers (Google Chrome and Mozilla Firefox) running on desktop only. **JS-Chip8** has the following components:

1. Chip8 **Emulator** can run any Chip8 program.
2. Chip8 **Visualizer** shows a Chip8 program in action. It displays memory, registers and instructions being executed. It lets users pause and step-forward/step-backward one instruction at a time.
3. One Chip8 **Tool**: *to be announced*. The goal is to build a Chip8 program that is useful to the intended users of the Chip8 emulator.  
4. Two Chip8 **Games**:  Game 1: Space War; Game 2: *to be announced*. The games are written in Chip8 language. They should be polished. Code reuse with proper citation are allowed but the majority (90% of code lines) should be written by the team.

## Project organization

### Software methodology 

We follow Extreme Programming methodologies for this project. The project startup plan (release 0 product documentation) includes limited information about the work breakdown and project schedule. During development, for each release, an informal project plan and effort estimates are created with involvement from all team members (Sommerville, Software Engineering, 9th Edition). 

The team will meet weekly to create user stories. The stories are ranked by importance and each story is assigned some effort points to indicate how much effort it will take, relative to other stories. At the beginning of each release, the team decide what user stories to implement and more detailed tasks are created for those stories. After each release, team velocity (i.e., how many effort-points per working day the team got done) and use as input for planning of the next release. Members chose what stories they want to work on rather than being assigned some stories to ensure personal accountability and create motivation. 

### Members' roles

The team has 6 Computer Science undergrads with the following roles:

1. Project manager: Minh Bui is responsible for scheduling team meetings, booking rooms and producing meeting memos. 
2. Front-end programmers: Kyle and Jong Joon Lee work on the interface of the application, after they are done, they will join the back-end team.  
3. Back-end programmers: Minh Bui, Karan Pathania, and Ali Danapour are in charge of implementing the emulator, visualizer, the games and one tool. 
4. Testers: For unit testing, members are responsible for testing their own code. Once unit testing is done, integration testing requires collaboration between all members.

**For Release 0, members has the following roles**:

- Minh Bui (Minh) consolidates members' input and is responsible for writing and formatting project documentation, and researching how to implement the Chip8 emulator and visualizer.
- Ali Danapour (Ali) and Karan Pathania (KP) create the prototype of Chip8 Game #1.
- Kyle Wu (Kyle) and Jong Joon Lee (JJ) code the interface of the application.
- Xinyue Ma has no role in release 0.  

Note: The 6th member, Xinyue Ma has been recently added to the team on January 17, Minh has reached out to him/her on the same day and just got a response on January 18.

**UPDATED: For Release 1, these following use cases are scheduled to be delivered**:

- CPU set-up: at the beginning or when the emulator resets, the memory, stack, registers should have some default values. 
- 36 Opcodes: correctly implement 36 opcodes based on the specifications in [Cowgod's chip8 reference](http://devernay.free.fr/hacks/chip8/C8TECH10.HTM).
- Input/Output/Sound Implementation: The system gives buzzer sounds whenever the sound timer reaches zero. The 16-key keyboard used for input will be mapped to the computer keyboard and will also be displayed on the web page according to the following mapping:

    1	2	3	C  ------>		1	2	3	4 <br>
    4	5	6	D  ------>	    Q	W	E	R <br>
    7	8	9	E  ------>		A	S	D	F <br>
    A	0	B	F  ------>		Z	X	C	V <br>

- Prototype of game 1: User playing against a computer AI. Two spaceships shooting at each other with a destroyable barrier in the middle. This game will have levels and points, and can be played through multiple rounds against the AI. The game is based on the famous arcade game ‘Outlaw’, with tweaks made to it, such as levels, and points. 
    - Actors:
        - User
        - Input/Output interface (may be used on alternative emulator)
        - Chip-8 Emulator (may be used on alternative emulator)
    - Preconditions:
        - User has loaded the game onto a compatible chip-8 emulator
    - Normal Flow:
        1. The user will load SpaceWars onto a compatible chip-8 emulator
        2. The system will proceed to execute SpaceWars code
        3. The system will display game information (score)
        4. The game will initialize
        5. Throughout the duration of the game, the user will provide directional and fire inputs using their keyboard
        6. Throughout the duration of the game, the system will show updated game state in real time
        7. Throughout the duration of the game, the system will provide automatic movement and fire for enemy (AI) player.
        8. At the completion of the game (either user or enemy reaches a score of 3), the game will terminate
        9. A screen indicating a win or loss condition will be displayed along with a prompt for a new game
        10. If the user chooses to replay the game, the system will reset all values to default and a new game is played

    - Alternate Flow:
        - 9A. If user chooses not to replay game, system will display win/loss screen indefinitely. It will be up to the user to close the system.

**UPDATED: For Release 2, these following use cases are scheduled to be delivered**:

- **TODO**

### Communication Plan 

#### Semester meeting Schedule with communication tools and techniques

|   MODE	|   TIME	|   TOOL|
|:-:	|:-:	|:-:	|
| In Person 	|  Weekly Monday/Friday, 12:30PM-2:30PM	|   Book room if needs whiteboard	|
|  Voice Call 	|   Tentative (mostly weekends)	|   Discord	|
|  Messages 	|   Daily	|   Slack	|
|  Urgent 	|   When needed	|   Phone call	|

NO-SHOW RULE: For pre-scheduled meetings (either in person or voice call), if a member anticipates that he/she will show up late or cannot show up at all, a notification must be posted in the #meetings channel in the Slack workspace at least 15 minutes in advance. If no notification is sent, members will wait for the missing member(s) for 10 minute before starting the meeting. 

## Risk analysis

|   Description	|   Likelihood	|   Impact | Risk Management Strategy|
|:-:	|:-:	|:-:	|:-:	|
|Conflicts between members due to unbalanced workload | Medium	| High	| Let members pick their tasks so that everyone has the chance to work on something they like. For tasks that no one volunteers to take, members with the most relevant experience and availability will be assigned to them |
|Limited time to work on the project during the end of the semester 	| High	|High	|Members carefully plan their last 3 weeks of the semester and share it with others. At the beginning of each release, each member will update their end-of-semester schedule if needed   	|
|Inaccurate estimation of time needed for a task |Medium	|High	|Let member(s) who are responsible for the task do the estimation then multiply that value by 3, and keep track of the number of hours actually spent to ensure more accurate estimation next time	|
|Fail to deliver promised extra feature |Medium	| Medium	| Member must conduct sufficient research before proposing additional features for the tool and the two games and be realistic about their existing skills and availability, core features must always be prioritized|

## Hardware and software resource requirements

|   Purpose	|   Related app components	|   Tool/Languages/Libraries name |
|:-:	|:-:	|:-:	|
|Front-End Programming	| Website interface 	| HTML, CSS 	|
|Back-End Programming | Emulator, Visualizer, chip8 tool 	| JavaScript 	|
|Game Programming | 2 Chip8 games	| [Octo](https://github.com/JohnEarnest/Octo)  	|
|Automated tests |Emulator, Visualizer, chip8 tool |  JavaScript, Jest, Chrome, Firefox|
|Version control	| All components 	| Git, Github	|
|Communication	| All components 	| Slack, Discord, Phone	|
|Planning	| All components 	| [Trello](https://trello.com) for Kanban Board, Google Doc & Spreadsheet|

- Hardware: Members should bring their personal laptop for group meetings. For remote work, they can either work on laptop or desktop.

- Testing methods: Our team will aim for test-driven development. Developers will write unit testing friendly code and try to eliminate most bugs at early stages of development. Apart from manually testing code at each stage (by individual developers), we will perform a code review on all parts of the product before every release. For unit testing, every developer is encouraged to rigorously unit-test their code at each stage of development and no later than each subsequent release. We plan to use Jest to automate unit testing. For integrated and functional testing, our team will perform integrated testing before every release to make sure no bugs are overlooked and passed on to next releases. When the final product is +75% ready, manual functional testing will be performed using Google Chrome and Mozilla Firefox to ensure cross browser functionalities.

## Work breakdown 

The work breakdown and project schedule below are tentative and will be update after each iteration. We used the rule of thumb introduced in class: (informal estimate of time) * 3 to calculate the Estimated Efforts (hours). 

**UPDATED**: **Febuary 5, 2018**: Started using Google Spreadsheet for Work Breakdown which allows easier replainning for future releases. 

[Link to Work Breakdown Spreadsheet](https://docs.google.com/spreadsheets/d/1HqADerMmskoAKjknKuDWZFQrG6OZgpwF0acj79XQYGA/edit?usp=sharing) 

Bellow is a snapshoot of out current Work Breakdown Spreadsheet, taken on Febuary 5, 2018:

![WBS example](WBS.PNG)

## Project schedule

The due dates of major deliverables are shown in the table above. Detailed scheduling, progress tracking and updates are done using Kanban Board via [Trello](https://trello.com). **UPDATED Febuary 5**: An example for release 1 is shown below:

![Trello example](trello_example.PNG)

## Monitoring and reporting mechanisms

We will use Git and GitHub for version control. To minimize merging conflicts, members follow these following rules:

1. Fetch remote changes frequently to avoid big conflicts
2. At most 3 members work off the same branch
3. Instead of handling multiple feature branches, use feature flags

Critical information is included in the project documentation and this documentation will be updated when more information is available. For detail release planning and progress tracking, we will Trello instead. For each task, member who is responsible for the task must track the number of hours he/she spend on it to improve effort estimation of tasks in the next release. With Trello, member can add notes to his/her tasks. 

In the case of re-planning, if the re-plaining results in delays of critical features, an in-person meeting must be held as soon as possible to discuss the following points:

1. What features are delayed to next release?
2. What are the consequences of such delays? 
3. Why the features are delayed? 
4. Is there any member who can take ownership of the abandoned features? 
5. Do the replanning if no one is available. 

To minimize re-planning, each Friday, the project manager will check-in with owners of each story to see if they need/want assistance or if any forseeable events might cause delay to allow early detection of potential re-planning and take actions to prevent it.  
