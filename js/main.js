// create player
const player = new Player();

// create/remove auomatically target
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

// create moving obstacle
const obstacle = new Obstacle();

// player life points
const lifePoints = document.getElementById('lives-count');
lifePoints.innerHTML = lives;


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

