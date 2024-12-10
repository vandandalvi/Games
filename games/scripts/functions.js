let sore = JSON.parse(localStorage.getItem('score'));
let score = sore ? sore : { win: 0, loss: 0, tie: 0 };
let computer = '';
let intervalautoplay = ''
let dark = document.querySelector('.dark')

dark.addEventListener('click',function(){
   
    if(dark.textContent==='Switch to Dark Mode'){
        dark.textContent='Switch to Light Mode'
    }
    else{dark.textContent='Switch to Dark Mode'}
    if(document.body.style.backgroundColor==='white'){
        document.body.style.backgroundColor='grey'
    }
    else{document.body.style.backgroundColor='white'}
})

document.body.addEventListener('keydown', (event) => {
    if (event.key === 'a') {
        playGame('rock');
    }
    if (event.key === 's') {
        playGame('paper');
    }
    if (event.key === 'd') {
        playGame('scissor');
    }
    if (event.key === 'r') {
        resetGame();
    }
})

document.querySelector('.resett')
    .addEventListener('click',()=>{resetGame()})



function autoplay() {

    if (!intervalautoplay) {
        intervalautoplay = setInterval(function () {
            computerMove();
            playGame(computer)
        }, 1000)
    }
}

function stopautoplay() {
    if (intervalautoplay) {
        clearInterval(intervalautoplay)
        intervalautoplay = '';
    }
}


function computerMove() {
    const random = Math.random();
    if (random < 1 / 3) {
        computer = 'rock';
    } else if (random < 2 / 3) {
        computer = 'paper';
    } else {
        computer = 'scissor';
    }
}

function playGame(playersChoice) {
    computerMove();
    let result = '';
    if (computer === playersChoice) {
        result = 'TIE';
        score.tie++;
    } else if (
        (computer === 'rock' && playersChoice === 'paper') ||
        (computer === 'paper' && playersChoice === 'scissor') ||
        (computer === 'scissor' && playersChoice === 'rock')
    ) {
        result = 'WIN';
        score.win++;
    } else if (
        (computer === 'paper' && playersChoice === 'rock') ||
        (computer === 'scissor' && playersChoice === 'paper') ||
        (computer === 'rock' && playersChoice === 'scissor')
    ) {
        result = 'LOSE';
        score.loss++;
    }

    localStorage.setItem('score', JSON.stringify(score));
    updateResult(playersChoice, result);
}

function updateResult(playersChoice = '', result = '') {
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = playersChoice
        ? `You chose <strong>${playersChoice}</strong>. 
Computer chose <strong>${computer}</strong>.<br>
Result: <strong>${result}</strong>.<br>
Wins: ${score.win}, Losses: ${score.loss}, Ties: ${score.tie}`
        : `Wins: ${score.win}, Losses: ${score.loss}, Ties: ${score.tie}`;
}

function resetGame() {
    score = { win: 0, loss: 0, tie: 0 };
    localStorage.setItem('score', JSON.stringify(score));
    updateResult();
}


updateResult();
