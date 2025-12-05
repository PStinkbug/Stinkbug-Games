const canvas = document.getElementById("pong");
const ctx = canvas.getContext("2d");

const paddleWidth = 10, paddleHeight = 80;
let leftPaddleY = canvas.height/2 - paddleHeight/2;
let rightPaddleY = canvas.height/2 - paddleHeight/2;
const paddleSpeed = 6;

let ball = { x: canvas.width/2, y: canvas.height/2, radius: 8, speedX: 4, speedY: 4 };

document.addEventListener("keydown", e => {
    if (e.key === "w") leftPaddleY -= paddleSpeed;
    if (e.key === "s") leftPaddleY += paddleSpeed;
});

function draw() {
    ctx.clearRect(0,0,canvas.width,canvas.height);

    // Paddles
    ctx.fillStyle = "var(--text)";
    ctx.fillRect(0, leftPaddleY, paddleWidth, paddleHeight);
    ctx.fillRect(canvas.width - paddleWidth, rightPaddleY, paddleWidth, paddleHeight);

    // Ball
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI*2);
    ctx.fill();
}

function update() {
    // Ball movement
    ball.x += ball.speedX;
    ball.y += ball.speedY;

    // Collisions with top/bottom
    if(ball.y - ball.radius < 0 || ball.y + ball.radius > canvas.height) ball.speedY *= -1;

    // Collisions with left paddle
    if(ball.x - ball.radius < paddleWidth && ball.y > leftPaddleY && ball.y < leftPaddleY + paddleHeight) ball.speedX *= -1;

    // Collisions with AI paddle
    if(ball.x + ball.radius > canvas.width - paddleWidth && ball.y > rightPaddleY && ball.y < rightPaddleY + paddleHeight) ball.speedX *= -1;

    // AI paddle movement
    if(rightPaddleY + paddleHeight/2 < ball.y) rightPaddleY += paddleSpeed;
    else if(rightPaddleY + paddleHeight/2 > ball.y) rightPaddleY -= paddleSpeed;

    // Reset if out of bounds
    if(ball.x < 0 || ball.x > canvas.width) {
        ball.x = canvas.width/2;
        ball.y = canvas.height/2;
        ball.speedX = 4 * (Math.random() > 0.5 ? 1 : -1);
        ball.speedY = 4 * (Math.random() > 0.5 ? 1 : -1);
    }

    draw();
    requestAnimationFrame(update);
}

update();
