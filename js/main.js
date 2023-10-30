class Player {
    constructor() {
        this.playerElm = document.getElementById('player');

        // player size
        this.width = 5;
        this.height = this.width;
        this.playerElm.style.width = this.width + "%";
        this.playerElm.style.height = this.height + "%";

        // player initial position
        this.posX = 50 - (this.width / 2);
        this.posY = 50 - (this.width / 2);
        this.playerElm.style.top = this.posY + "%";
        this.playerElm.style.left = this.posX + "%";

        //player move factor reset
        this.resetMoveFactor();


    }
    resetMoveFactor() {
        this.moveFactor = 5; // set move factor
    }
    moveUp() {
        if (this.posY - this.moveFactor < 0) {
            this.moveFactor = this.posY
        }             
        this.posY -= this.moveFactor;
        this.playerElm.style.top = this.posY + '%';

        this.resetMoveFactor();
    }
    moveDown() {
        if (this.posY + this.moveFactor > 100 - this.height) {
            this.moveFactor = 100 - (this.posY + this.height)
        } 
        this.posY += this.moveFactor;
        this.playerElm.style.top = this.posY + '%';

        this.resetMoveFactor();
    }
    moveLeft() {
        if (this.posX - this.moveFactor < 0) {
            this.moveFactor = this.posX
        }             
        this.posX -= this.moveFactor;
        this.playerElm.style.left = this.posX + '%';

        this.resetMoveFactor();
    }
    moveRight() {
        if (this.posX + this.moveFactor > 100 - this.width) {
            this.moveFactor = 100 - (this.posX + this.width)
        } 
        this.posX += this.moveFactor;
        this.playerElm.style.left = this.posX + '%';

        this.resetMoveFactor();
    }
}


class Target {
    constructor() {
        this.targetElm = null

        // target size & position values
        this.width = 7;
        this.height = this.width;

        // randomize target position 
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

// !!! delete later
// const target = new Target();


// create/remove auomatically targets, timeout 900 - interval 1000
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


// player life points
const lifePoints = document.getElementById('lives-count');
lifePoints.innerHTML = 5;


// set timer decreasing lives automatically
const reduceLives = () => {
    if (lifePoints.innerHTML > 0) {
        lifePoints.innerHTML--;
    }
}
setInterval(reduceLives, 3000);


document.addEventListener('keydown', (event) => {
    // move player with keyboard
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

