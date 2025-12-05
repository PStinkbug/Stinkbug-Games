let score = parseInt(localStorage.getItem("cookies")) || 0;
let autoClickers = parseInt(localStorage.getItem("autoClickers")) || 0;
let superClickers = parseInt(localStorage.getItem("superClickers")) || 0;
let megaClickers = parseInt(localStorage.getItem("megaClickers")) || 0;

let autoClickerCost = parseInt(localStorage.getItem("autoClickerCost")) || 10;
let superClickerCost = parseInt(localStorage.getItem("superClickerCost")) || 50;
let megaClickerCost = parseInt(localStorage.getItem("megaClickerCost")) || 200;

const scoreDisplay = document.getElementById("score");
const cookie = document.getElementById("cookie");
const autoClickerBtn = document.getElementById("autoClickerBtn");

function updateDisplay(){
    scoreDisplay.textContent = `${score} Cookies`;
    autoClickerBtn.textContent = `Buy Auto-Clicker (${autoClickerCost} Cookies)`;
    document.getElementById("superClickerBtn").textContent = `Buy Super Clicker (+5/sec) (${superClickerCost} Cookies)`;
    document.getElementById("megaClickerBtn").textContent = `Buy Mega Clicker (+20/sec) (${megaClickerCost} Cookies)`;
}

cookie.addEventListener("click", ()=>{
    score++;
    updateDisplay();
    saveGame();
});

autoClickerBtn.addEventListener("click", ()=>{
    if(score >= autoClickerCost){
        score -= autoClickerCost;
        autoClickers++;
        autoClickerCost = Math.floor(autoClickerCost * 1.5);
        updateDisplay();
        saveGame();
    }
});

document.getElementById("superClickerBtn").addEventListener("click", ()=>{
    if(score >= superClickerCost){
        score -= superClickerCost;
        superClickers++;
        superClickerCost = Math.floor(superClickerCost * 1.5);
        updateDisplay();
        saveGame();
    }
});

document.getElementById("megaClickerBtn").addEventListener("click", ()=>{
    if(score >= megaClickerCost){
        score -= megaClickerCost;
        megaClickers++;
        megaClickerCost = Math.floor(megaClickerCost * 1.5);
        updateDisplay();
        saveGame();
    }
});

function saveGame(){
    localStorage.setItem("cookies", score);
    localStorage.setItem("autoClickers", autoClickers);
    localStorage.setItem("superClickers", superClickers);
    localStorage.setItem("megaClickers", megaClickers);
    localStorage.setItem("autoClickerCost", autoClickerCost);
    localStorage.setItem("superClickerCost", superClickerCost);
    localStorage.setItem("megaClickerCost", megaClickerCost);
}

// Auto-clickers interval
setInterval(()=>{
    score += autoClickers + superClickers*5 + megaClickers*20;
    updateDisplay();
    saveGame();
}, 1000);

updateDisplay();
