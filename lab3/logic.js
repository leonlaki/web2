const canvas = document.getElementById('canvasId');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


//--------------------------ELEMENTS---------------------------
//Palica (Paddle)
let paddleWidth = 150;
let paddleHeight = 20;
let paddleXPos = (canvas.width - paddleWidth) / 2;
let paddleYPos = canvas.height - paddleHeight - 10;

function drawPaddle() {
    //Apply shadow properties
    ctx.shadowOffsetX = 5; //Horizontal shadow offset
    ctx.shadowOffsetY = 5; //Vertical shadow offset
    ctx.shadowBlur = 10; //Blur level for shadow
    ctx.shadowColor = "rgba(255, 255, 255, 0.7)"; //255 because of black background

    //Paddle color
    ctx.fillStyle = "#bf0a13"; 
    
    //Draw the paddle
    ctx.fillRect(paddleXPos, paddleYPos, paddleWidth, paddleHeight);

    //Reset shadow properties after drawing to avoid affecting other elements
    ctx.shadowOffsetX = 0; 
    ctx.shadowOffsetY = 0;
    ctx.shadowBlur = 0; 
    ctx.shadowColor = "transparent";
}



//Loptica (Ball)
let ballRadius = 12;
let ballXPos = paddleXPos + paddleWidth / 2;
let ballYPos = paddleYPos - ballRadius;

function drawBall() {
    ctx.beginPath();
    ctx.arc(ballXPos, ballYPos, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#bf0a13";
    ctx.fill();
    ctx.closePath();
}

//Blokovi (Blocks)
const blockRowCount = 4; //4 rows of blocks
const blockColumnCount = 10; //10 blocks in each row
const blockWidth = canvas.width / blockColumnCount;
const blockHeight = 25;
const blockPadding = 2;
const blockOffsetTop = 10;
const blockColors = ["#bf1711", "blue", "yellow", "#067019"];

let blocks = [];

for(let row = 0; row < blockRowCount; row++) {
    blocks[row] = [];
    for(let col = 0; col < blockColumnCount; col++) {
        //Defining each block
        blocks[row][col] = { 
            x: col * (blockWidth + blockPadding),
            y: blockOffsetTop + row * (blockHeight + blockPadding),
            width: blockWidth - blockPadding,
            height: blockHeight,
            color: blockColors[row], 
            visible: true 
        };
    }
}

function drawBlocks() {
    for(let row = 0; row < blockRowCount; row++) {
        for(let col = 0; col < blockColumnCount; col++) {
            const block = blocks[row][col]; //define each of the blocks
            if(block.visible) {
                ctx.shadowOffsetX = 5;  //Horizontal shadow offset
                ctx.shadowOffsetY = 5;  //Vertical shadow offset
                ctx.shadowBlur = 10;    //Shadow blur level
                ctx.shadowColor = "rgba(255, 255, 255, 0.7)"; //255 because of the black backgorund

                // Set block color
                ctx.fillStyle = block.color;
                ctx.fillRect(block.x, block.y, block.width, block.height);
            }
        }
    }
}
//------------------------------------------------------------

//Move paddle with arrow keys
function movePaddle() {
    //Speed set on 20 pixels for each direction
    //Move left
    if(leftPressed && paddleXPos > 0) {
        paddleXPos = paddleXPos - 20
    }
    //Move right 
    if(rightPressed && paddleXPos < canvas.width - paddleWidth) {
        paddleXPos = paddleXPos + 20; 
    }
}

//------------------------MOVING THE PADDLE---------------------------
//Key press tracking
let leftPressed = false; //"<-" button on keyboard
let rightPressed = false;//"->" button on keyboard

//When the key(s) are pressed down
document.addEventListener("keydown", function(event) {
    if(event.key === "ArrowLeft") {
        leftPressed = true; 
    }
    if(event.key === "ArrowRight") {
        rightPressed = true;
    }
});

//When the key(s) are released
document.addEventListener("keyup", function(event) {
    if(event.key === "ArrowLeft") {
        leftPressed = false; // Stop moving left when left arrow is released
    }
    if(event.key === "ArrowRight") {
        rightPressed = false; // Stop moving right when right arrow is released
    }
});
//----------------------------------------------------------------------

//Ball speed (set it on 10)
let ballSpeedX = 10; 
let ballSpeedY = 10; 

//Keeping track of the score
let score = 0;

//Best score recorded
let bestScore;
if(localStorage.getItem('bestScore')) {
    bestScore = parseInt(localStorage.getItem('bestScore'));
} else {
    bestScore = 0;
}

let gameWonFlag = false;

//------------------COLLISON LOGIC--------------------------------------
function moveBall() {
    if(gameWonFlag) return;

    ballXPos += ballSpeedX; //Update ball's X position
    ballYPos += ballSpeedY; //Update ball's Y position

    //If the ball hits the left/right wall
    if(ballXPos + ballRadius > canvas.width || ballXPos - ballRadius < 0) {
        ballSpeedX = -ballSpeedX; //Only the x component of the vector is changing direction, y component stays the same
    }

    //Bounce off top wall
    if(ballYPos - ballRadius < 0) {
        ballSpeedY = -ballSpeedY; //Only the y component of the vector is changing direction, x component stays the same
    }

    //Does the ball hit the paddle within X and Y range
    if(ballYPos + ballRadius > paddleYPos && ballYPos - ballRadius < paddleYPos + paddleHeight
        && ballXPos > paddleXPos && ballXPos < paddleXPos + paddleWidth) {
        ballYPos = paddleYPos - ballRadius;
        ballSpeedY = -ballSpeedY; //Changing the y component of the speed vector
        
    }

    //If ball hits one of the blocks
    for(let row = 0; row < blockRowCount; row++) {
        for(let col = 0; col < blockColumnCount; col++) {
            const block = blocks[row][col];
            if(block.visible) {
                //Check if ball intersects the block
                if(ballXPos > block.x && ballXPos < block.x + block.width &&
                    ballYPos - ballRadius < block.y + block.height && 
                    ballYPos + ballRadius > block.y) {
                    //Remove the block when ball hits it
                    block.visible = false;
                    //Changing the y component of the speed vector
                    ballSpeedY = -ballSpeedY;
                    //Score is updated
                    score = score + 1;
                    //If the current score is larger than the best score, update the localStorage and save the new highest score
                    if(score > bestScore) {
                        bestScore = score;
                        localStorage.setItem('bestScore', bestScore); 
                    }
                    //If player beats the game
                    if(score === blockRowCount * blockColumnCount) {
                        gameWonFlag = true;
                        ctx.clearRect(0, 0, canvas.width, canvas.height);
                        ctx.font = '48px Arial';
                        ctx.fillStyle = '#FFD700';
                        ctx.fillText('Congratulations! You have beaten the game!', canvas.width / 2 - 140, canvas.height / 2);
                    }
                }
            }
        }
    }

    //Ball missed the paddle (GAME OVER)
    if(ballYPos + ballRadius > canvas.height) {
        ctx.font = '48px Arial';
        ctx.fillStyle = 'red';
        ctx.fillText('GAME OVER!', canvas.width / 2 - 140, canvas.height / 2);
    }
}
//----------------------------------------------------------------------


//Score and Best Score OAT (Off All Time) - Display
function showScore() {
    ctx.font = "20px Arial"; 
    ctx.fillStyle = "white";
    ctx.fillText("Score: " + score, canvas.width - 100, 30);

    ctx.font = "20px Arial"
    ctx.fillText("Best Score Of All Time: " + bestScore, canvas.width - 250, 55);
}

//Calling all the methods!
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    movePaddle();
    drawPaddle();
    drawBall();
    drawBlocks();
    moveBall();
    showScore();
}

setInterval(draw, 1000 / 60); //Call draw function 60 times per second