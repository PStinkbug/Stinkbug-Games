let score = parseInt(localStorage.getItem("cookies")) || 0;
let autoClickers = parseInt(localStorage.getItem("autoClickers")) || 0;
const scoreDisplay = document.getElementById("score");
const cookie = document.getElementById("cookie");
const autoClickerBtn = document.getElementById("autoClickerBtn");

function updateDisplay(){
    scoreDisplay.textContent = `${score} Cookies`;
}

cookie.addEventListener("click", ()=>{
    score++;
    updateDisplay();
    saveGame();
});

autoClickerBtn.addEventListener("click", ()=>{
    if(score >= 10){
        score -= 10;
        autoClickers++;
        updateDisplay();
        saveGame();
    }
});

function saveGame(){
    localStorage.setItem("cookies", score);
    localStorage.setItem("autoClickers", autoClickers);
}

// Auto-clicker interval
setInterval(()=>{
    score += autoClickers;
    updateDisplay();
    saveGame();
}, 1000);

updateDisplay();
