class Player {
    constructor() {
        this.playerElm = document.getElementById('player');

        // Player size
        this.width = 5;
        this.height = this.width;
        this.playerElm.style.width = this.width + "%";
        this.playerElm.style.height = this.height + "%";

        // Player initial position
        this.posX = 0;
        this.posY = 50 - (this.width / 2);
        this.playerElm.style.top = this.posY + "%";
        this.playerElm.style.left = this.posX + "%";
    }

    moveUp() {
        this.posY -= 6;
        this.playerElm.style.top = this.posY + '%';
    }
    moveDown() {
        this.posY += 6;
        this.playerElm.style.top = this.posY + '%';
    }
    moveLeft() {
        this.posX -= 6;
        this.playerElm.style.left = this.posX + '%';
    }
    moveRight() {
        this.posX += 6;
        this.playerElm.style.left = this.posX + '%';
    }
}


class Target {
    constructor() {
        this.targetElm = null

        // Target size & position values
        this.width = 7;
        this.height = this.width;

        // Randomize target position 
        this.posX = Math.floor(Math.random() * (100 - this.width + 1));
        this.posY = Math.floor(Math.random() * (100 - this.height + 1));

        this.createTarget();
    }
    createTarget() {
        // Create target & append it to the DOM
        this.targetElm = document.createElement('div');
        const targetParent = document.getElementById('board');
        targetParent.appendChild(this.targetElm);
        this.targetElm.className = 'target';

        // Add size & position values to the target 
        this.targetElm.style.width = this.width + "%";
        this.targetElm.style.height = this.height + "%";
        this.targetElm.style.top = this.posY + "%";
        this.targetElm.style.left = this.posX + "%";
    }
}

const player = new Player();

// ! Delete later
// const target = new Target();


// create/remove auomatically targets, timeout 900 - interval 1000
// const targetsArray = [];

let target = null;
let targetHit;

const createTargets = () => {
    target = new Target();
    targetHit = false; 

    setTimeout(() => {
        target.targetElm.remove();
    }, 3_000); 
}
setInterval(createTargets, 3_500);


// player's life points
const lifePoints = document.getElementById('lives-count');
lifePoints.innerHTML = 5;


// set timer decreasing decreasing )
const reduceLives = () =>{
    if(lifePoints.innerHTML > 0){
        lifePoints.innerHTML--;
    }
}
setInterval(reduceLives, 2000);


document.addEventListener('keydown', (event) => {
    // move player 
    switch (event.key) {
        case 'ArrowUp':
            player.moveUp()
            break;
        case 'ArrowDown':
            player.moveDown()
            break;
        case 'ArrowLeft':
            player.moveLeft()
            break;
        case 'ArrowRight':
            player.moveRight()
            break;
    }

    // increase lives when player-target interesection occurs
    if (
        // event.key == " " &&
        !targetHit &&
        player.posX < target.posX + target.width &&
        player.posX + player.width > target.posX &&
        player.posY < target.posY + target.height &&
        player.posY + player.height > target.posY
    ) {
        lifePoints.innerHTML++;;
        targetHit = true;
    }
})

