const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

let points = 0;

const blockSize = 20;
const snake = [{ x: 10, y: 10 }];
let food = { x: 5, y: 5 };
let direction = "";

function gameLoop() {
  update();
  draw();
  setTimeout(gameLoop, 150);
}

function restartGame() {
  snake.length = 1;
  snake[0] = { x: 10, y: 10 };
  placeFood();
  points = 0;
  document.getElementById("points").innerHTML = 0;
}

function update() {
  if (snakeCollidesWithWalls() || snakeCollidesWithItself()) {
    displayGameOver();
  } else {
    moveSnake();
    if (snakeCollidesWithFood()) {
      handleFoodEating();
      placeFood();
    }
  }
}

function moveSnake() {
  const head = { ...snake[0] };

  switch (direction) {
    case "up":
      head.y -= 1;
      break;
    case "down":
      head.y += 1;
      break;
    case "left":
      head.x -= 1;
      break;
    case "right":
      head.x += 1;
      break;
    default:
      break;
  }

  snake.unshift(head);

  if (!snakeCollidesWithFood()) {
    snake.pop();
  }

  if (snakeCollidesWithItself()) {
    displayGameOver();
    return;
  }
}

function snakeCollidesWithFood() {
  const head = snake[0];
  return head.x === food.x && head.y === food.y;
}

function handleFoodEating() {
  const head = snake[0];
  let newSegment;

  switch (direction) {
    case "up":
      newSegment = { x: head.x, y: head.y - 1 };
      break;
    case "down":
      newSegment = { x: head.x, y: head.y + 1 };
      break;
    case "left":
      newSegment = { x: head.x - 1, y: head.y };
      break;
    case "right":
      newSegment = { x: head.x + 1, y: head.y };
      break;
    default:
      break;
  }

  snake.unshift(newSegment);

  points++;
  document.getElementById("points").innerHTML = points;
}

function placeFood() {
  food.x = Math.floor(Math.random() * 20);
  food.y = Math.floor(Math.random() * 20);
}

function snakeCollidesWithWalls() {
  const head = snake[0];
  return head.x < 0 || head.x >= 20 || head.y < 0 || head.y >= 20;
}

function snakeCollidesWithItself() {
  const head = snake[0];

  for (let i = 1; i < snake.length; i++) {
    const segment = snake[i];
    if (head.x === segment.x && head.y === segment.y) {
      return true;
    }
  }

  return false;
}

function displayGameOver() {
  alert("Game Over! ");
  restartGame();
}

const mouseImage = document.getElementById("mouseImage");
function draw() {
  const blockSize = 20;
  ctx.fillStyle = "black";
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "green";
  for (let i = 0; i < snake.length; i++) {
    const { x, y } = snake[i];
    ctx.fillRect(x * blockSize, y * blockSize, blockSize, blockSize);
  }

  ctx.fillStyle = "lightgreen";
  const { x: headX, y: headY } = snake[0];
  ctx.fillRect(headX * blockSize, headY * blockSize, blockSize, blockSize);

  ctx.drawImage(
    mouseImage,
    food.x * blockSize,
    food.y * blockSize,
    blockSize,
    blockSize
  );
}

document.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "ArrowUp":
      direction = "up";
      break;
    case "ArrowDown":
      direction = "down";
      break;
    case "ArrowLeft":
      direction = "left";
      break;
    case "ArrowRight":
      direction = "right";
      break;
  }
});

gameLoop();
