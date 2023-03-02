const playBoard = document.querySelector(".play-board");
const scoreElements= document.querySelector(".score");
const highScoreElements= document.querySelector(".high-score");
const controls = document.querySelectorAll(".controls i");

let gameOver = false;
let foodX, foodY;
let snakeX = 5, snakeY = 10;
let snakeBody = [];
let velocityX= 0, velocityY= 0;
let setIntervalId;
let score = 0; 

let highScore = localStorage.getItem("high-score") || 0;
highScoreElements.innerText = `High Score: ${highScore}`;

//perubahan posisi awal dengan metode array dustructor
const changeFoodPosition = () => {
	//random 0-30 posisi peubahan value pada food
	foodX = Math.floor(Math.random() * 30) + 1;
	foodY = Math.floor(Math.random() * 30) + 1;
}


const handleGameOver = () => {
	clearInterval(setIntervalId);
	alert("Game Over! Click Tombol ok untuk bermain lagi");
	location.reload();
}

const changeDirection = (e) => {
	//dapat merubah nilai value pada dasar key
	if(e.key === "ArrowUp" && velocityY != 1) {
		velocityX = 0;
		velocityY = -1;
	} else if(e.key === "ArrowDown" && velocityY != -1) {
		velocityX = 0;
		velocityY = 1;
	} else if(e.key === "ArrowLeft" && velocityX != 1) {
		velocityX = -1;
		velocityY = 0;
	} else if(e.key === "ArrowRight" && velocityX != -1) {
		velocityX = 1;
		velocityY = 0;
	}
	initGame();
}

controls.forEach(key => {
	key.addEventListener("click", () => changeDirection({ key: key.dataset.key }) );
});

const initGame = () => {
	if(gameOver) return handleGameOver();
	let htmlMarkup = `<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`;
	
	if(snakeX === foodX && snakeY === foodY) {
		changeFoodPosition();
		snakeBody.push([foodX, foodY]);
		score++;

		highScore = score >= highScore ? score : highScore;
		localStorage.setItem("high-score", highScore);
		scoreElements.innerText = `Score: ${score}`;
		highScoreElements.innerText = `High Score: ${highscore}`;
	}

	for (let i = snakeBody.length -1; i > 0; i--) {
		snakeBody[i] = snakeBody[ i -1];
	}

	snakeBody[0] = [snakeX, snakeY];//Pengaturan badan ular

	//updating
	snakeX += velocityX;
	snakeY += velocityY;

	if(snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30) {
		gameOver = true;
	}

	for (let i = 0; i < snakeBody.length; i++) {
		htmlMarkup += `<div class="head" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`;	
		//Pengecekan Jika Kepala ular kena badan maka akan berkahir game
		if(i !== 0 && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] === snakeBody[i][0] )	{
			gameOver = true;
		}
	}	
	playBoard.innerHTML = htmlMarkup;
}
changeFoodPosition();
setIntervalId = setInterval(initGame,125);
document.addEventListener("keydown", changeDirection);