// create player
const player = new Player();


// audio
const electricSound = new Audio('../audio/electric-shock.mp3');
electricSound.volume = .3;
const flyBuzz = document.getElementById("myAudio");
flyBuzz.volume = .1;
const lifeSound = new Audio('../audio/scored.mp3');
const gameOverSound = new Audio('../audio/game-over.mp3');


flyBuzz.play();
window.addEventListener('DOMContentLoaded', event => {
    flyBuzz.play();
})


// create/remove auomatically target
let target;
let targetHit;

const createTargets = () => {
    target = new Target();
    targetHit = false;

    setTimeout(() => {
        target.targetElm.remove();
    }, 3000);

    setInterval(checkTargetCollision, 30); // target-player collision detection
}
setInterval(createTargets, 3500);


// create/remove obstacles
let horizontalObstacle;
let verticalObstacle;
let horizontalObstacleHit;
let verticalObstacleHit;

const minTime = 6000;
const maxTime = 12000;

const randomTime = (minTime, maxTime) => {
    return Math.floor(Math.random() * (maxTime - minTime + 1) + minTime);
}

// horizontal obstacles
const createHorizontalObstacle = () => {
    horizontalObstacle = new Obstacle(60, 4);
    horizontalObstacleHit = false;

    setTimeout(() => {
        horizontalObstacle.obstacleElm.remove();
    }, 4_000);

    setInterval(checkHorizontalCollision, 30); // obstacle-player collision detection
}
setInterval(createHorizontalObstacle, randomTime(minTime, maxTime));


// vertical obstacles
const createVerticallObstacle = () => {
    verticalObstacle = new Obstacle(4, 60);
    verticalObstacleHit = false;

    verticalObstacle.obstacleElm.classList.add('vertical-obstacle')

    setTimeout(() => {
        verticalObstacle.obstacleElm.remove();
    }, 4_000);

    setInterval(checkVerticalCollision, 30); // obstacle-player collision detection
}
setInterval(createVerticallObstacle, randomTime(minTime, maxTime));


// player life points
const lifePoints = document.getElementById('lives-count');
lifePoints.innerHTML = lives;


// set timer decreasing lives automatically
const reduceLives = () => {
    if (lifePoints.innerHTML > 0) {
        lifePoints.innerHTML--;
    }
}
setInterval(reduceLives, 6000);


// move player
document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'ArrowUp':
            player.moveUp();
            player.playerElm.classList.remove('rotate-down', 'rotate-left', 'rotate-right');
            player.playerElm.classList.add('rotate-up');
            break;
        case 'ArrowDown':
            player.moveDown();
            player.playerElm.classList.remove('rotate-up', 'rotate-left', 'rotate-right');
            player.playerElm.classList.add('rotate-down');
            break;
        case 'ArrowLeft':
            player.moveLeft();
            player.playerElm.classList.remove('rotate-up', 'rotate-down', 'rotate-right');
            player.playerElm.classList.add('rotate-left');
            break;
        case 'ArrowRight':
            player.moveRight();
            player.playerElm.classList.remove('rotate-up', 'rotate-down', 'rotate-left');
            player.playerElm.classList.add('rotate-right');
            break;
    }
});



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
            lifeSound.play();
            targetHit = true;
        }
    }
}


// check collision between player and obstacle
function checkHorizontalCollision() {
    if (player && horizontalObstacle) {
        if (
            lifePoints.innerHTML > 0 &&
            !horizontalObstacleHit &&
            player.posX < horizontalObstacle.posX + horizontalObstacle.width &&
            player.posX + player.width > horizontalObstacle.posX &&
            player.posY < horizontalObstacle.posY + horizontalObstacle.height &&
            player.posY + player.height > horizontalObstacle.posY
        ) {
            lifePoints.innerHTML--;
            electricSound.play();
            horizontalObstacleHit = true;
        }
    }
}

function checkVerticalCollision() {
    if (player && verticalObstacle) {
        if (
            lifePoints.innerHTML > 0 &&
            !verticalObstacleHit &&
            player.posX < verticalObstacle.posX + verticalObstacle.width &&
            player.posX + player.width > verticalObstacle.posX &&
            player.posY < verticalObstacle.posY + verticalObstacle.height &&
            player.posY + player.height > verticalObstacle.posY
        ) {
            lifePoints.innerHTML--;
            electricSound.play();
            verticalObstacleHit = true;
        }
    }
}

// game over condition
setInterval(() => {
    if (lifePoints.innerHTML == 0) {
        gameOverSound.play();
        setTimeout(() => {
            location.href = "./gameover.html";
        }, 2000)
    }
}, 30)



