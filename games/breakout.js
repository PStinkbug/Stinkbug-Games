const canvas = document.getElementById("breakout");
const ctx = canvas.getContext("2d");

const paddle = { width: 100, height: 10, x: canvas.width/2 - 50, y: canvas.height-20, speed: 6 };
let rightPressed = false;
let leftPressed = false;

document.addEventListener("keydown", e => {
    if(e.key === "ArrowRight") rightPressed = true;
    if(e.key === "ArrowLeft") leftPressed = true;
});
document.addEventListener("keyup", e => {
    if(e.key === "ArrowRight") rightPressed = false;
    if(e.key === "ArrowLeft") leftPressed = false;
});

const ball = { x: canvas.width/2, y: canvas.height-30, radius: 8, dx: 4, dy: -4 };

const brickRowCount = 5;
const brickColumnCount = 7;
const brickWidth = 70;
const brickHeight = 20;
const brickPadding = 10;
const brickOffsetTop = 30;
const brickOffsetLeft = 35;

let bricks = [];
for(let c=0;c<brickColumnCount;c++){
    bricks[c]=[];
    for(let r=0;r<brickRowCount;r++){
        bricks[c][r]={x:0,y:0,status:1};
    }
}

function drawBall(){
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI*2);
    ctx.fillStyle = "var(--text)";
    ctx.fill();
    ctx.closePath();
}

function drawPaddle(){
    ctx.fillStyle = "var(--text)";
    ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
}

function drawBricks(){
    for(let c=0;c<brickColumnCount;c++){
        for(let r=0;r<brickRowCount;r++){
            if(bricks[c][r].status===1){
                let brickX = c*(brickWidth+brickPadding)+brickOffsetLeft;
                let brickY = r*(brickHeight+brickPadding)+brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.fillStyle = "var(--accent)";
                ctx.fillRect(brickX, brickY, brickWidth, brickHeight);
            }
        }
    }
}

function collisionDetection(){
    for(let c=0;c<brickColumnCount;c++){
        for(let r=0;r<brickRowCount;r++){
            let b = bricks[c][r];
            if(b.status===1){
                if(ball.x>b.x && ball.x<b.x+brickWidth && ball.y>b.y && ball.y<b.y+brickHeight){
                    ball.dy = -ball.dy;
                    b.status = 0;
                }
            }
        }
    }
}

function draw(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    drawBricks();
    drawBall();
    drawPaddle();
    collisionDetection();

    if(ball.x+ball.dx>canvas.width-ball.radius || ball.x+ball.dx<ball.radius) ball.dx = -ball.dx;
    if(ball.y+ball.dy<ball.radius) ball.dy = -ball.dy;
    else if(ball.y+ball.dy>canvas.height-ball.radius){
        if(ball.x>paddle.x && ball.x<paddle.x+paddle.width) ball.dy = -ball.dy;
        else {
            alert("Game Over!");
            document.location.reload();
        }
    }

    ball.x += ball.dx;
    ball.y += ball.dy;

    if(rightPressed && paddle.x < canvas.width-paddle.width) paddle.x += paddle.speed;
    if(leftPressed && paddle.x > 0) paddle.x -= paddle.speed;

    requestAnimationFrame(draw);
}

draw();
