// game setup
const lives = 10;
const moveFactorDefault = 6;

class Player {
    constructor() {
        this.playerElm = document.getElementById('player');

        // player size
        this.width = 5;
        this.height = this.width;
        this.playerElm.style.width = this.width + "%";
        this.playerElm.style.height = this.height + "%";

        // player initial position
        this.posX = 12
        this.posY = 12
        this.playerElm.style.top = this.posY + "%";
        this.playerElm.style.left = this.posX + "%";

        //player move factor reset
        this.resetMoveFactor();
    }
    resetMoveFactor() {
        this.moveFactor = moveFactorDefault; // set move factor
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