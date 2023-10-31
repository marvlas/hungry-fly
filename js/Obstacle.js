class Obstacle {
    constructor() {
        this.obstacleElm = null

        // target size & position values
        this.width = 60;
        this.height = 4;

        // randomize target position 
        this.posX = 50 - (this.width / 2);
        this.posY = 50 - (this.height / 2);

        this.createObstacle();
        this.rotateObstacle();
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
    rotateObstacle() {
        let rotation = 0;
        const automateRotation = () => {
            this.obstacleElm.style.transform = `rotate(${rotation}deg)`;
            rotation += 1;
        }

        setInterval(automateRotation, 30);
    }
}

