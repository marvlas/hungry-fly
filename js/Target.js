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

// check collision between player and obstacle
function checkTargetCollision() {
    if (player && target) {
        if (
            !targetHit &&
            player &&
            target &&
            player.posX < target.posX + target.width &&
            player.posX + player.width > target.posX &&
            player.posY < target.posY + target.height &&
            player.posY + player.height > target.posY
        ) {
            lifePoints.innerHTML++;
            targetHit = true;
        }
    }
}
