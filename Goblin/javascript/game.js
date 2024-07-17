'use strict';
// Obtener el lienzo y el contexto
var canvas = document.getElementById("gameCanvas");
var ctx = canvas.getContext("2d");
// Variables para el héroe y el goblin
var hero = {
  x: 20, // Margen desde la izquierda
  y: 20, // Margen desde arriba
  width: 32,
  height: 32,
  speed: 20
};
var goblin = {
  x: Math.random() * (canvas.width - 32 - 40) + 20, // Margen desde la izquierda y la derecha
  y: Math.random() * (canvas.height - 32 - 40) + 30, // Margen desde arriba y abajo
  width: 32,
  height: 32
};
// Marcador
var score = 0;
// Escuchar eventos de teclado
document.addEventListener("keydown",keyDownHandler,false);
function keyDownHandler(e) {
  if (e.key == "ArrowUp") {
    if (hero.y > 20) { // Comprobar que el héroe no se salga del área del juego hacia arriba
      hero.y -=hero.speed;
    }
  } else if (e.key=="ArrowDown") {
    if (hero.y<canvas.height-hero.height-30) { // Comprobar que el héroe no se salga del área del juego hacia abajo
      hero.y += hero.speed;
    }
  } else if (e.key == "ArrowLeft") {
    if (hero.x > 30) { // Comprobar que el héroe no se salga del área del juego hacia la izquierda
      hero.x -= hero.speed;
    }
  } else if (e.key == "ArrowRight") {
    if (hero.x < canvas.width - hero.width - 30) { // Comprobar que el héroe no se salga del área del juego hacia la derecha
      hero.x += hero.speed;
    }
  }
// Detectar colisión entre el héroe y el goblin
  if (collision(hero, goblin)) {
    // Incrementar el marcador
    score++;
    // Colocar al goblin en una nueva posición aleatoria
    goblin.x = Math.random() * (canvas.width - 32 - 40) + 30; // Margen desde la izquierda y la derecha
    goblin.y = Math.random() * (canvas.height - 32 - 40) + 30; // Margen desde arriba y abajo
  }
}
// Función para detectar colisión entre dos objetos
function collision(obj1, obj2) {
  return obj1.x < obj2.x + obj2.width &&
         obj1.x + obj1.width > obj2.x &&
         obj1.y < obj2.y + obj2.height &&
         obj1.y + obj1.height > obj2.y;
}
// Función para dibujar el héroe
function drawHero() {
  var heroImg = new Image();
  heroImg.src = "multimedia/images/hero.png";
  ctx.drawImage(heroImg, hero.x, hero.y, hero.width, hero.height);
}
// Función para dibujar el goblin
function drawGoblin() {
  var goblinImg = new Image();
  goblinImg.src = "multimedia/images/monster.png";
  ctx.drawImage(goblinImg, goblin.x, goblin.y, goblin.width, goblin.height);
}
// Función para dibujar el marcador
function drawScore() {
  ctx.font = "38px 'MedievalSharp', sans-serif"; // Fuente del marcador
  ctx.fillStyle = "white";
  ctx.fillText("Goblins Caught:"+score,8,30);
}
// Función para dibujar la escena
function draw() {
  var fondo = new Image();
  fondo.src = "multimedia/images/background.png";
  fondo.onload = function() {
    ctx.drawImage(fondo, 0, 0, canvas.width, canvas.height); // Dibujar el fondo
    drawHero(); // Dibujar el héroe
    drawGoblin(); // Dibujar el goblin
    drawScore(); // Dibujar el marcador
  };
}
// Bucle del juego
function gameLoop() {
  draw(); // Dibujar la escena
  requestAnimationFrame(gameLoop); // Llamar a gameLoop de nuevo en el próximo fotograma
}
gameLoop(); // Iniciar el bucle del juego