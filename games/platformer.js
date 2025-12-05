const canvas = document.getElementById("platformer");
const ctx = canvas.getContext("2d");

// Player
const player = { x: 50, y: 350, width: 30, height: 30, speedX: 4, speedY: 0, gravity: 0.7, jumpPower: -12, onGround: false };

// Platforms
const platforms = [
    { x: 0, y: 370, width: 600, height: 30 },
    { x: 150, y: 300, width: 100, height: 10 },
    { x: 300, y: 250, width: 120, height: 10 },
    { x: 480, y: 200, width: 80, height: 10 },
    { x: 600, y: 300, width: 100, height: 10 },
    { x: 750, y: 250, width: 120, height: 10 },
    { x: 900, y: 200, width: 80, height: 10 },
    { x: 1050, y: 150, width: 100, height: 10 }
];

let keys = {};

document.addEventListener("keydown", e => { keys[e.key] = true; });
document.addEventListener("keyup", e => { keys[e.key] = false; });

function update(){
    // Horizontal movement
    if(keys["ArrowLeft"]) player.x -= player.speedX;
    if(keys["ArrowRight"]) player.x += player.speedX;

    // Gravity
    player.speedY += player.gravity;
    player.y += player.speedY;
    player.onGround = false;

    // Platform collision
    platforms.forEach(p => {
        if(player.x + player.width > p.x && player.x < p.x + p.width &&
           player.y + player.height > p.y && player.y + player.height < p.y + p.height){
            player.y = p.y - player.height;
            player.speedY = 0;
            player.onGround = true;
        }
    });

    // Jump
    if(keys[" "] && player.onGround) player.speedY = player.jumpPower;

    // Boundaries
    if(player.y + player.height > canvas.height) {
        player.y = canvas.height - player.height;
        player.speedY = 0;
        player.onGround = true;
    }
}

function draw(){
    ctx.clearRect(0,0,canvas.width,canvas.height);

    // Platforms
    ctx.fillStyle = "var(--accent)";
    platforms.forEach(p => ctx.fillRect(p.x, p.y, p.width, p.height));

    // Player
    ctx.fillStyle = "var(--text)";
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

function gameLoop(){
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

gameLoop();
