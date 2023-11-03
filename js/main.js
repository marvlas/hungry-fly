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
            electricSound.volume = .05;
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
            electricSound.volume = .05;
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
setInterval(reduceLives, 4000);


// create & remove target with timer
const createTargets = () => {
    target = new Target();
    targetHit = false;

    setTimeout(() => {
        target.targetElm.remove();
    }, 3000);

    setInterval(checkTargetCollision, 15); // target-player collision detection
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

    setInterval(checkHorizontalCollision, 10); // obstacle-player collision detection
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

    setInterval(checkVerticalCollision, 10); // obstacle-player collision detection
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

// Keep track of which arrow keys are currently pressed
const keysPressed = {};

document.addEventListener('keydown', (event) => {
    keysPressed[event.key] = true;

    // diagonal movements
    if (keysPressed['ArrowUp'] && keysPressed['ArrowRight']) {
        player.moveUp();
        player.moveRight();
        player.playerElm.classList.remove('rotate-down', 'rotate-left', 'rotate-right', 'rotate-up-left', 'rotate-down-right', 'rotate-down-left');
        player.playerElm.classList.add('rotate-up-right');
    } else if (keysPressed['ArrowUp'] && keysPressed['ArrowLeft']) {
        player.moveUp();
        player.moveLeft();
        player.playerElm.classList.remove('rotate-down', 'rotate-left', 'rotate-right', 'rotate-up-right', 'rotate-down-right', 'rotate-down-left');
        player.playerElm.classList.add('rotate-up-left');
    } else if (keysPressed['ArrowDown'] && keysPressed['ArrowRight']) {
        player.moveDown();
        player.moveRight();
        player.playerElm.classList.remove('rotate-down', 'rotate-left', 'rotate-right', 'rotate-up-right', 'rotate-up-left', 'rotate-down-left');
        player.playerElm.classList.add('rotate-down-right');
    } else if (keysPressed['ArrowDown'] && keysPressed['ArrowLeft']) {
        player.moveDown();
        player.moveLeft();
        player.playerElm.classList.remove('rotate-down', 'rotate-left', 'rotate-right', 'rotate-up-right', 'rotate-up-left', 'rotate-down-right');
        player.playerElm.classList.add('rotate-down-left');
    } else {
        // horizontal & vertical movements
        switch (event.key) {
            case 'ArrowUp':
                player.moveUp();
                player.playerElm.classList.remove('rotate-down', 'rotate-left', 'rotate-right', 'rotate-up-right', 'rotate-up-left', 'rotate-down-right', 'rotate-down-left');
                player.playerElm.classList.add('rotate-up');
                break;
            case 'ArrowDown':
                player.moveDown();
                player.playerElm.classList.remove('rotate-up', 'rotate-left', 'rotate-right', 'rotate-up-right', 'rotate-up-left', 'rotate-down-right', 'rotate-down-left');
                player.playerElm.classList.add('rotate-down');
    
                break;
            case 'ArrowLeft':
                player.moveLeft();
                player.playerElm.classList.remove('rotate-up', 'rotate-down', 'rotate-right', 'rotate-up-right', 'rotate-up-left', 'rotate-down-right', 'rotate-down-left');
                player.playerElm.classList.add('rotate-left');
    
                break;
            case 'ArrowRight':
                player.moveRight();
                player.playerElm.classList.remove('rotate-up', 'rotate-down', 'rotate-left', 'rotate-up-right', 'rotate-up-left', 'rotate-down-right', 'rotate-down-left');
                player.playerElm.classList.add('rotate-right');
                break;
        }
    }
});

document.addEventListener('keyup', (event) => {
    delete keysPressed[event.key];
});


// play player audio
window.addEventListener('DOMContentLoaded', event => {
    const flyBuzz = document.getElementById("fly-audio");
    flyBuzz.volume = .1;
    flyBuzz.play();
})



// timer
window.onload = function () {
    let seconds = 0;
    let minutes = 0;
    let addMinutes = document.getElementById("minutes");
    let addSeconds = document.getElementById("seconds");
    let interval;

    // start the timer on page load
    interval = setInterval(startTimer, 1000);

    function startTimer() {
        seconds++;

        if (seconds <= 9) {
            addSeconds.innerHTML = "0" + seconds;
        }
        if (seconds > 9) {
            addSeconds.innerHTML = seconds;
        }
        if (seconds > 59) {
            minutes++;
            addMinutes.innerHTML = minutes <= 9 ? "0" + minutes : minutes;
            seconds = 0;
            addSeconds.innerHTML = "00";
        }
    }
};

  



