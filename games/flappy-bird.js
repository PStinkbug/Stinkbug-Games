const canvas = document.getElementById("flappy");
const ctx = canvas.getContext("2d");

const bird = { x: 50, y: 300, radius: 12, velocity: 0, gravity: 0.6, lift: -10 };
const pipes = [];
const pipeWidth = 50;
const gap = 150;
let frame = 0;

document.addEventListener("keydown", () => bird.velocity = bird.lift);
document.addEventListener("mousedown", () => bird.velocity = bird.lift);

function drawBird(){
    ctx.beginPath();
    ctx.arc(bird.x, bird.y, bird.radius, 0, Math.PI*2);
    ctx.fillStyle = "var(--accent)";
    ctx.fill();
    ctx.closePath();
}

function drawPipes(){
    for(let p of pipes){
        ctx.fillStyle = "var(--text)";
        ctx.fillRect(p.x, 0, pipeWidth, p.top);
        ctx.fillRect(p.x, canvas.height - p.bottom, pipeWidth, p.bottom);
    }
}

function updatePipes(){
    if(frame % 90 === 0){
        const top = Math.floor(Math.random()*200 + 50);
        const bottom = canvas.height - top - gap;
        pipes.push({x: canvas.width, top: top, bottom: bottom});
    }
    for(let p of pipes){
        p.x -= 3;
    }
    if(pipes.length && pipes[0].x + pipeWidth < 0) pipes.shift();
}

function collisionDetection(){
    for(let p of pipes){
        if(bird.x + bird.radius > p.x && bird.x - bird.radius < p.x + pipeWidth){
            if(bird.y - bird.radius < p.top || bird.y + bird.radius > canvas.height - p.bottom){
                alert("Game Over!");
                document.location.reload();
            }
        }
    }
    if(bird.y + bird.radius > canvas.height || bird.y - bird.radius < 0){
        alert("Game Over!");
        document.location.reload();
    }
}

function draw(){
    ctx.clearRect(0,0,canvas.width,canvas.height);

    drawBird();
    drawPipes();

    bird.velocity += bird.gravity;
    bird.y += bird.velocity;

    updatePipes();
    collisionDetection();

    frame++;
    requestAnimationFrame(draw);
}

draw();
