// create player
const player = new Player();

// audio
let flyBuzz = new Audio('../audio/fly-noise.mp3');
flyBuzz.play;

// create/remove auomatically target
let target;
let targetHit;

const createTargets = () => {
    target = new Target();
    targetHit = false;

    setTimeout(() => {
        target.targetElm.remove();
    }, 3_000);


    setInterval(checkTargetCollision, 30); // target-player collision detection
}
setInterval(createTargets, 3_500);


// create/remove obstacles
let obstacle;
let obstacleHit;

const minTime = 6000;
const maxTime = 12000;

const randomTime = (minTime, maxTime) => {
    return Math.floor(Math.random() * (maxTime - minTime + 1) + minTime);
}

// horizontal obstacles
const createHorizontalObstacle = () => {  
    horizontalObstacle = new Obstacle(60, 4);
    obstacleHit = false;

    setTimeout(() => {
        horizontalObstacle.obstacleElm.remove();
    }, 4_000);

    setInterval(checkObstacleCollision, 30); // obstacle-player collision detection
}
setInterval(createHorizontalObstacle, randomTime(minTime, maxTime));

// vertical obstacles
const createVerticallObstacle = () => { 
    verticalObstacle = new Obstacle(4, 60);
    obstacleHit = false;

    verticalObstacle.obstacleElm.classList.add('vertical-obstacle')
    console.log(verticalObstacle.obstacleElm)
    
    setTimeout(() => {
        verticalObstacle.obstacleElm.remove();
    }, 4_000);

    setInterval(checkObstacleCollision, 30); // obstacle-player collision detection
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
// setInterval(reduceLives, 6000);


document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'ArrowUp':
            player.moveUp();
            break;
        case 'ArrowDown':
            player.moveDown();
            break;
        case 'ArrowLeft':
            player.moveLeft();
            break;
        case 'ArrowRight':
            player.moveRight();
            break;
    }
});


// check collision between player and obstacle
function checkObstacleCollision() {
    if (player && horizontalObstacle) {
        if (
            lifePoints.innerHTML > 0 &&
            !obstacleHit &&
            player.posX < horizontalObstacle.posX + horizontalObstacle.width &&
            player.posX + player.width > horizontalObstacle.posX &&
            player.posY < horizontalObstacle.posY + horizontalObstacle.height &&
            player.posY + player.height > horizontalObstacle.posY
        ) {
            lifePoints.innerHTML--;
            obstacleHit = true;
        }
    }

    if (player && verticalObstacle) {
        if (
            lifePoints.innerHTML > 0 &&
            !obstacleHit &&
            player.posX < verticalObstacle.posX + verticalObstacle.width &&
            player.posX + player.width > verticalObstacle.posX &&
            player.posY < verticalObstacle.posY + verticalObstacle.height &&
            player.posY + player.height > verticalObstacle.posY
        ) {
            lifePoints.innerHTML--;
            obstacleHit = true;
        }
    }
}


// setInterval(() => {
//     if (lifePoints.innerHTML == 0) {
//         location.href = "./gameover.html";
//     }
// }, 30)



