# Hungry Fly

## Description
The player moves across the board by using the mouse or arrow keys, and needs to hit targets popping up randomly on the board and disappearing after a few secs. The player's life decreases automatically after a certain amount of time. If player hits targets life points increase, if players hit false targets the player's life decreases. When the life score is 0 the game is over. There is a timer for records.

## How to play
(to do)

## MVP
The player can be moved and needs to hit targets popping up and disappearing from the board.

## Milestones

### Milestone 1
- [x]  Player initial position and size
- [x]  Player movement by pressing keyboards keys
- [x]  Targets position and size 
- [x]  Targets popping up randomly and disappearing

### Milestone 2
- [x]  Collision condition and formula
- [x]  Lives decreasing automatically
- [x]  Lives increasing when target is hit
- [x]  Setting board limits for player
- [x]  Create obstacles
- [x]  Lives decreases when obstacle is hit

### Milestone 3
- [ ]  Improve player movement (diagonal movement, speed) smoothness)
- [ ]  Game over condition
- [ ]  UX / UI
- [ ]  *Bonus* Build timer
- [ ]  *Bonus* - User mouse cursor as a player and hit tag by clicking
- [ ]  *Bonus* - Increase game speed after a certain amount of time
- [ ]  *Bonus* - Add life safers (golden poo)






**Click Instructrions**
1) Register a click event and store the mouse position
2) Extend the mouse coordinates to cover a larger surface (for example leftLimit = mouseposition x - 10)
3) Loop through all your bugs or whatever you need to be able to click on. Calculate the space and position they occupy on your screen. If the bug's limit are within the range of the mouse click, destroy it