/******* VARIABLES *******/

// create player
const lives = 5;
const lifePoints = document.getElementById('lives-count');
lifePoints.innerHTML = lives;
const moveFactorDefault = 6;

const player = new Player(); 

// target & obstacles
let target;
let horizontalObstacle;
let verticalObstacle;
let targetHit; // flag
let horizontalObstacleHit; // flag
let verticalObstacleHit; // flag

// obstacles reation time range
const minTime = 6000;  
const maxTime = 12000;



/******* FUNCTIONALITIES *******/

// check player-target collision
const checkTargetCollision = () =>{
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

            const lifeSound = document.getElementById("scored-audio");
            lifeSound.play();
        }
    }
    if (targetHit === true){
        target.targetElm.classList.add('hidden');
    }
}


// check player-horizontal obstacle collision
const checkHorizontalCollision = () =>{
    if (player && horizontalObstacle) {
        if (
            lifePoints.innerHTML > 0 &&
            !horizontalObstacleHit &&
            player.posX < horizontalObstacle.posX + horizontalObstacle.width &&
            player.posX + player.width > horizontalObstacle.posX &&
            player.posY < horizontalObstacle.posY + horizontalObstacle.height &&
            player.posY + player.height > horizontalObstacle.posY
        ) {
            const electricSound = document.getElementById("shock-audio");
            electricSound.volume = .3;
            electricSound.play();

            lifePoints.innerHTML--;
            horizontalObstacleHit = true;
        }
    }
}


// check player-vertical obstacle collision
const checkVerticalCollision = () =>{
    if (player && verticalObstacle) {
        if (
            lifePoints.innerHTML > 0 &&
            !verticalObstacleHit &&
            player.posX < verticalObstacle.posX + verticalObstacle.width &&
            player.posX + player.width > verticalObstacle.posX &&
            player.posY < verticalObstacle.posY + verticalObstacle.height &&
            player.posY + player.height > verticalObstacle.posY
        ) {
            const electricSound = document.getElementById("shock-audio2");
            electricSound.volume = .3;
            electricSound.play();

            lifePoints.innerHTML--;
            verticalObstacleHit = true;
        }
    }
}


// decrease lives automatically
const reduceLives = () => {
    if (lifePoints.innerHTML > 0) {
        lifePoints.innerHTML--;
    }
}
setInterval(reduceLives, 6000);


// create & remove target with timer
const createTargets = () => {
    target = new Target();
    targetHit = false;

    setTimeout(() => {
        target.targetElm.remove();
    }, 3000);

    setInterval(checkTargetCollision, 30); // target-player collision detection
}
setInterval(createTargets, 3500);


// pick random time within range
const randomTime = (minTime, maxTime) => {
    return Math.floor(Math.random() * (maxTime - minTime + 1) + minTime);
}


// create horizontal obstacles
const createHorizontalObstacle = () => {
    horizontalObstacle = new Obstacle(60, 4);
    horizontalObstacleHit = false;

    setTimeout(() => {
        horizontalObstacle.obstacleElm.remove();
    }, 4_000);

    setInterval(checkHorizontalCollision, 30); // obstacle-player collision detection
}
setInterval(createHorizontalObstacle, randomTime(minTime, maxTime));


// create vertical obstacles
const createVerticalObstacle = () => {
    verticalObstacle = new Obstacle(4, 60);
    verticalObstacleHit = false;

    verticalObstacle.obstacleElm.classList.add('vertical-obstacle')

    setTimeout(() => {
        verticalObstacle.obstacleElm.remove();
    }, 4_000);

    setInterval(checkVerticalCollision, 30); // obstacle-player collision detection
}
setInterval(createVerticalObstacle, randomTime(minTime, maxTime));


// game over condition
setInterval(() => {
    if (lifePoints.innerHTML == 0) {
        const gameOverSound = document.getElementById("gameover-audio");
        gameOverSound.play();
        setTimeout(() => {
            location.href = "./gameover.html";
        }, 2000)
    }
}, 30)


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


// play player audio
window.addEventListener('DOMContentLoaded', event => {
    const flyBuzz = document.getElementById("fly-audio");
    flyBuzz.volume = .1;
    flyBuzz.play();
})





