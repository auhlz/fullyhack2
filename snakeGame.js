const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Define constants
const GRID_SIZE = 20;
const CANVAS_SIZE = 400;
const INITIAL_SNAKE_LENGTH = 3;
const FRAME_RATE = 8;

// Initialize snake variables
let snake = [{ x: 10, y: 10 }];
let food = { x: 15, y: 15 };
let dx = 0;
let dy = 0;
let score = 0;

// Function to draw a cell with the specified color
function drawCell(x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x * GRID_SIZE, y * GRID_SIZE, GRID_SIZE, GRID_SIZE);
  ctx.strokeStyle = 'black';
  ctx.strokeRect(x * GRID_SIZE, y * GRID_SIZE, GRID_SIZE, GRID_SIZE);
}

// Function to draw the snake
function drawSnake() {
  snake.forEach(segment => drawCell(segment.x, segment.y, getSnakeColor()));
}

// Function to draw the food
function drawFood() {
  drawCell(food.x, food.y, getFoodColor());
}

// Function to move the snake
function moveSnake() {
  const head = { x: snake[0].x + dx, y: snake[0].y + dy };
  snake.unshift(head);
  if (head.x === food.x && head.y === food.y) {
    score += 10;
    generateFood();
  } else {
    snake.pop();
  }
}

// Function to generate food at random location
function generateFood() {
  food = {
    x: Math.floor(Math.random() * (CANVAS_SIZE / GRID_SIZE)),
    y: Math.floor(Math.random() * (CANVAS_SIZE / GRID_SIZE))
  };
}

// Function to handle collision detection
function checkCollision() {
  if (
    snake[0].x < 0 ||
    snake[0].x >= CANVAS_SIZE / GRID_SIZE ||
    snake[0].y < 0 ||
    snake[0].y >= CANVAS_SIZE / GRID_SIZE ||
    snake.slice(1).some(segment => segment.x === snake[0].x && segment.y === snake[0].y)
  ) {
    return true;
  }
  return false;
}

// Function to reset the game
function resetGame() {
  snake = [{ x: 10, y: 10 }];
  dx = 0;
  dy = 0;
  score = 0;
  generateFood();
}

// Function to update game state
function update() {
  if (checkCollision()) {
    resetGame();
  }
  moveSnake();
}

// Function to draw everything
function draw() {
  ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  drawSnake();
  drawFood();
}

// Function to main game loop
function gameLoop() {
  update();
  draw();
}

// Function to handle key presses
document.addEventListener('keydown', e => {
  if (e.key === 'ArrowUp' && dy === 0) {
    dx = 0;
    dy = -1;
  }
  if (e.key === 'ArrowDown' && dy === 0) {
    dx = 0;
    dy = 1;
  }
  if (e.key === 'ArrowLeft' && dx === 0) {
    dx = -1;
    dy = 0;
  }
  if (e.key === 'ArrowRight' && dx === 0) {
    dx = 1;
    dy = 0;
  }
});

// Start the game loop
generateFood();
setInterval(gameLoop, 1000 / FRAME_RATE);

// Function to get the snake color from CSS variable
function getSnakeColor() {
  return getComputedStyle(document.documentElement).getPropertyValue('--snake_color');
}

// Function to get the food color from CSS variable
function getFoodColor() {
  return getComputedStyle(document.documentElement).getPropertyValue('--food_color');
}
