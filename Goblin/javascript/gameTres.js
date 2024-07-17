'use strict';
// Constantes y configuración inicial
const CANVAS_WIDTH = 512;
const CANVAS_HEIGHT = 480;
const PADDINGTB = 43;
const PADDINGLR = 39;
const HERO_SIZE = 32;
const GOBLIN_SIZE = 32;
const HERO_SPEED = 20;
// Obtener el lienzo y el contexto
const canvas = document.getElementById("gameCanvas");
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;
const ctx = canvas.getContext("2d");
// Variables del juego
let score = 0;
let hero = createCharacter(CANVAS_WIDTH / 2 - HERO_SIZE / 2, CANVAS_HEIGHT / 2 - HERO_SIZE / 2, HERO_SIZE, HERO_SIZE, HERO_SPEED);
let goblin = createCharacter(randomPosition(CANVAS_WIDTH, GOBLIN_SIZE, PADDINGLR), randomPosition(CANVAS_HEIGHT, GOBLIN_SIZE, PADDINGTB), GOBLIN_SIZE, GOBLIN_SIZE);
// Cargar imágenes
const heroImg = loadImage("multimedia/images/hero.png");
const goblinImg = loadImage("multimedia/images/monster.png");
const fondoImg = loadImage("multimedia/images/background.png");
// Escuchar eventos de teclado
document.addEventListener("keydown", (e) => handleKeyDown(e, hero));
// Bucle del juego
window.onload = function() {
  gameLoop();
};
// Funciones
function createCharacter(x, y, width, height, speed = 0) {
  return { x, y, width, height, speed };
}
function randomPosition(max, size, padding) {
  return Math.random() * (max - size - 2 * padding) + padding;
}
function loadImage(src) {
  const img = new Image();
  img.src = src;
  return img;
}
function handleKeyDown(e, character) {
  e.preventDefault(); // Prevenir el desplazamiento de la página
  switch (e.key) {
    case "ArrowUp":
      if (character.y > PADDINGTB) character.y -= character.speed;
      break;
    case "ArrowDown":
      if (character.y < CANVAS_HEIGHT - character.height - PADDINGTB) character.y += character.speed;
      break;
    case "ArrowLeft":
      if (character.x > PADDINGLR) character.x -= character.speed;
      break;
    case "ArrowRight":
      if (character.x < CANVAS_WIDTH - character.width - PADDINGLR) character.x += character.speed;
      break;
  }
  if (collision(hero, goblin)) {
    score++;
    goblin.x = randomPosition(CANVAS_WIDTH, GOBLIN_SIZE, PADDINGLR);
    goblin.y = randomPosition(CANVAS_HEIGHT, GOBLIN_SIZE, PADDINGTB);
  }
}
function collision(obj1, obj2) {
  return obj1.x < obj2.x + obj2.width &&
         obj1.x + obj1.width > obj2.x &&
         obj1.y < obj2.y + obj2.height &&
         obj1.y + obj1.height > obj2.y;
}
function drawCharacter(img, character) {
  ctx.drawImage(img, character.x, character.y, character.width, character.height);
}
function drawScore() {
  ctx.font = "36px 'MedievalSharp', sans-serif"; // Fuente del marcador
  ctx.fillStyle = "white";
  ctx.fillText("Goblins Caught: " + score, 10, 30);
}
function draw() {
  ctx.drawImage(fondoImg, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT); // Dibujar el fondo
  drawCharacter(heroImg, hero); // Dibujar el héroe
  drawCharacter(goblinImg, goblin); // Dibujar el goblin
  drawScore(); // Dibujar el marcador
}
function gameLoop() {
  requestAnimationFrame(gameLoop); // Llamar a gameLoop de nuevo en el próximo fotograma
  draw(); // Dibujar la escena
}