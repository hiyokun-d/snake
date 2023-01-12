const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

//box
const box =  {
	size: 30,
	rows: 25,
	colls: 25
}

//snake
const snake = {
	x: box.size * 5,
	y: box.size * 5,
	color: "white",
	width: 30,
	height: 30,
	velocityX: 1, 
	velocityY: 0,
}

//food
const food = {
	x: 0,
	y: 0,

	color: "green",
	width: 30,
	height: 30
};

const placeFood = () => {
	food.x = Math.floor(Math.random() * box.colls) * box.size;
	food.y = Math.floor(Math.random() * box.rows) * box.size;
}

//snakes body
const snakebody = []


canvas.width = box.rows * box.size;
canvas.height = box.colls * box.size;

addEventListener("resize", () => {
	canvas.width = box.rows * box.size;
	canvas.height = box.colls * box.size;
});

function game() {
	ctx.fillStyle="black";
	ctx.fillRect(0, 0, canvas.width, canvas.height)

	//food
	ctx.fillStyle = food.color;
	ctx.fillRect(food.x, food.y, food.width, food.height)

	//snake body
	if(snake.y === food.y && snake.x === food.x) {
		snakebody.push([food.x, food.y])
		placeFood()
	}

	for(let i = snakebody.length - 1; i > 0; i--) {
		snakebody[i] = snakebody[i -1]
	}

	if(snakebody.length) {
		snakebody[0] = [snake.x, snake.y]
	}

	for(const element of snakebody) {
		ctx.fillStyle = snake.color;
		ctx.fillRect(element[0], element[1], snake.width, snake.height)
	}

	//snake
	snake.x += snake.velocityX * box.size
	snake.y += snake.velocityY * box.size
	ctx.fillStyle = snake.color;
	ctx.fillRect(snake.x, snake.y, snake.width, snake.height) 

}

const movement =(e) => {
	requestAnimationFrame(movement)
		if(e.key === "w" && snake.velocityY !== 1) {
		snake.velocityY = -1;
		snake.velocityX = 0;
	} else if(e.key === "s" && snake.velocityY !== -1) {
		snake.velocityX = 0;
		snake.velocityY = 1;
	} else if(e.key === "a" && snake.velocityX !== 1) {
		snake.velocityX = -1;
		snake.velocityY = 0;
	} else if(e.key === "d" && snake.velocityX !== -1) {
		snake.velocityX  = 1;
		snake.velocityY = 0;
	}
}

addEventListener("keypress", movement)

placeFood()
setInterval(game, 1000/10)
