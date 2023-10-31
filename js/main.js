// create player
const player = new Player();

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

const createHorizontalObstacle = () => {
    obstacle = new Obstacle(60, 4);
    obstacleHit = false;

    setTimeout(() => {
        obstacle.obstacleElm.remove();
    }, 4_000);

    setInterval(checkObstacleCollision, 30); // obstacle-player collision detection
}
setInterval(createHorizontalObstacle, randomTime(minTime, maxTime));

const createVerticallObstacle = () => {
    verticalObstacle = new Obstacle(4, 60);
    obstacleHit = false;

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
setInterval(reduceLives, 3000);


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



setInterval(() =>{
  if(lifePoints.innerHTML == 0){
    location.href = "./gameover.html";
  }
}, 30)



