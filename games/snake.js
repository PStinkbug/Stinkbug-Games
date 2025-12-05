const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

let snake = [{x:200, y:200}];
let direction = "RIGHT";
let food = {x: Math.floor(Math.random()*40)*10, y: Math.floor(Math.random()*40)*10};

document.addEventListener("keydown", e => {
    if (e.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
    if (e.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
    if (e.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
    if (e.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
});

function gameLoop() {
    let head = {...snake[0]};

    if (direction === "UP") head.y -= 10;
    if (direction === "DOWN") head.y += 10;
    if (direction === "LEFT") head.x -= 10;
    if (direction === "RIGHT") head.x += 10;

    snake.unshift(head);

    // Eat food
    if (head.x === food.x && head.y === food.y) {
        food = {x: Math.floor(Math.random()*40)*10, y: Math.floor(Math.random()*40)*10};
    } else {
        snake.pop();
    }

    // Game over
    if (
        head.x < 0 || head.x >= 400 ||
        head.y < 0 || head.y >= 400 ||
        snake.slice(1).some(s => s.x === head.x && s.y === head.y)
    ) {
        alert("Game Over!");
        snake = [{x:200, y:200}];
        direction = "RIGHT";
    }

    draw();
}

function draw() {
    ctx.clearRect(0,0,400,400);

    // Draw snake
    ctx.fillStyle = "lime";
    snake.forEach(part => ctx.fillRect(part.x, part.y, 10, 10));

    // Draw food
    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, 10, 10);
}

setInterval(gameLoop, 100);
