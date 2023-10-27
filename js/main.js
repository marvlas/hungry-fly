class Player {
    constructor() {
        this.playerElm = document.getElementById('player');

        // Player size
        this.width = 5;
        this.height = this.width;
        this.playerElm.style.width =  this.width + "vw";
        this.playerElm.style.height =  this.height + "vh";
  

        // Player initial position
        this.posX = 0;
        this.posY = 0;
        this.playerElm.style.top = this.posY + "vh";
        this.playerElm.style.left = this.posX + "vw";


    }

    moveUp() {
        this.posY--; 
        this.playerElm.style.top = this.posY + 'vh';
    }
    moveDown() {
        this.posY++; 
        this.playerElm.style.top = this.posY + 'vh';
    }
    moveLeft() {
        this.posX--; 
        this.playerElm.style.left = this.posX + 'vw';
    }
    moveRight() {
        this.posX++; 
        this.playerElm.style.left = this.posX + 'vw';
    }
}


const player = new Player();




document.addEventListener('keydown', (event) => {
    switch (event.key){
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
})


