class Player {
    constructor() {
        this.playerElm = document.getElementById('player');

        // Player size
        this.width = 5;
        this.height = this.width;
        this.playerElm.style.width = this.width + "vw";
        this.playerElm.style.height = this.height + "vh";

        // Player initial position
        this.posX = 0;
        this.posY = 50% - (this.width/2);
        this.playerElm.style.top = this.posY + "vh";
        this.playerElm.style.left = this.posX + "vw";
    }

    moveUp() {
        this.posY -= 3;
        this.playerElm.style.top = this.posY + 'vh';
    }
    moveDown() {
        this.posY += 3;
        this.playerElm.style.top = this.posY + 'vh';
    }
    moveLeft() {
        this.posX -= 3;
        this.playerElm.style.left = this.posX + 'vw';
    }
    moveRight() {
        this.posX += 3;
        this.playerElm.style.left = this.posX + 'vw';
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



// Create targets and remove automatically targets after 1s
const targetsArray = [];


const createTargets = () =>{
    const target = new Target();
    targetsArray.push(target);
    
    // Remove targets after 1s
    setTimeout(() =>{
        targetsArray[0].targetElm.remove()
        targetsArray.shift();
    }, 1000)
}



document.addEventListener('keydown', (event) => {
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
})




// function printMousePos(event) {
//     document.body.textContent =
//         "clientX: " + event.clientX +
//         " - clientY: " + event.clientY;
// }

// document.addEventListener("click", (event) => {
//     console.log(event)
//     console.log("clientX: " + event.clientX)
//     console.log(" - clientY: " + event.clientY)
// });



// document.body.addEventListener('click', function (event) {
//     if (player.playerElm.contains(event.target)) {
//         console.log('clicked inside');
//     } else {
//         console.log('clicked outside');
//     }
// });