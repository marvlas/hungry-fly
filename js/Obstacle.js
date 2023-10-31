class Obstacle {
    constructor(width, height) {
        this.obstacleElm = null

        // target size & position values
        this.width = width;
        this.height = height;

        // randomize target position 
        this.posX = Math.floor(Math.random() * (100 - this.width + 1));
        this.posY = Math.floor(Math.random() * (100 - this.height + 1));

        this.createObstacle();
    }
    createObstacle() {
        // Create target & append it to the DOM
        this.obstacleElm = document.createElement('div');
        const obstacleParent = document.getElementById('board');
        obstacleParent.appendChild(this.obstacleElm);
        this.obstacleElm.className = 'obstacle';

        // Add size & position values to the target 
        this.obstacleElm.style.width = this.width + "%";
        this.obstacleElm.style.height = this.height + "%";
        this.obstacleElm.style.top = this.posY + "%";
        this.obstacleElm.style.left = this.posX + "%";
    }
}


// check collision between player and obstacle
function checkObstacleCollision() {
    if (player && obstacle) {
        if (
            lifePoints.innerHTML > 0 &&
            !obstacleHit &&
            player.posX < obstacle.posX + obstacle.width &&
            player.posX + player.width > obstacle.posX &&
            player.posY < obstacle.posY + obstacle.height &&
            player.posY + player.height > obstacle.posY
        ) {
            console.log('obstacle hit!')
            lifePoints.innerHTML--;
            obstacleHit = true;
        }
    }
}
