const canvas = document.getElementById("space");
const ctx = canvas.getContext("2d");

// Player
const player = { x: canvas.width/2 - 20, y: canvas.height - 30, width: 40, height: 10, speed: 6 };
let leftPressed = false, rightPressed = false;
const bullets = [];

// Enemies
const rows = 3, cols = 8;
const enemies = [];
const enemyWidth = 40, enemyHeight = 20, enemyPadding = 10;
let enemyDirection = 1;

for(let r=0;r<rows;r++){
    for(let c=0;c<cols;c++){
        enemies.push({
            x: c*(enemyWidth+enemyPadding)+50,
            y: r*(enemyHeight+enemyPadding)+30,
            width: enemyWidth,
            height: enemyHeight,
            alive: true
        });
    }
}

// Controls
document.addEventListener("keydown", e => {
    if(e.key === "ArrowLeft") leftPressed = true;
    if(e.key === "ArrowRight") rightPressed = true;
    if(e.key === " ") bullets.push({x: player.x + player.width/2 - 2, y: player.y, width:4, height:10, speed:7});
});
document.addEventListener("keyup", e => {
    if(e.key === "ArrowLeft") leftPressed = false;
    if(e.key === "ArrowRight") rightPressed = false;
});

function drawPlayer(){
    ctx.fillStyle = "var(--accent)";
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

function drawEnemies(){
    ctx.fillStyle = "var(--text)";
    enemies.forEach(e => { if(e.alive) ctx.fillRect(e.x, e.y, e.width, e.height); });
}

function drawBullets(){
    ctx.fillStyle = "var(--accent)";
    bullets.forEach(b => ctx.fillRect(b.x, b.y, b.width, b.height));
}

function updateEnemies(){
    let hitEdge = false;
    enemies.forEach(e => {
        if(e.alive) e.x += enemyDirection;
        if(e.x + e.width > canvas.width || e.x < 0) hitEdge = true;
    });
    if(hitEdge){
        enemyDirection *= -1;
        enemies.forEach(e => { if(e.alive) e.y += 10; });
    }
}

function updateBullets(){
    bullets.forEach((b, i) => {
        b.y -= b.speed;
        enemies.forEach(e => {
            if(e.alive && b.x < e.x + e.width && b.x + b.width > e.x && b.y < e.y + e.height && b.y + b.height > e.y){
                e.alive = false;
                bullets.splice(i,1);
            }
        });
        if(b.y + b.height < 0) bullets.splice(i,1);
    });
}

function collisionCheck(){
    enemies.forEach(e => {
        if(e.alive && e.y + e.height >= player.y){
            alert("Game Over!");
            document.location.reload();
        }
    });
}

function draw(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    drawPlayer();
    drawEnemies();
    drawBullets();
}

function update(){
    if(leftPressed && player.x > 0) player.x -= player.speed;
    if(rightPressed && player.x + player.width < canvas.width) player.x += player.speed;
    updateEnemies();
    updateBullets();
    collisionCheck();
    draw();
    requestAnimationFrame(update);
}

update();
