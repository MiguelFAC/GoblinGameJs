'use strict';

    // Configuración del canvas
    const CANVAS_WIDTH = 512;
    const CANVAS_HEIGHT = 480;
    const PADDING = 40;
    const HERO_SIZE = 32;
    const GOBLIN_SIZE = 32;
    const HERO_SPEED = 5;

    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;

    // Variables del juego
    let score = 0;
    const hero = { x: CANVAS_WIDTH / 2 - HERO_SIZE / 2, y: CANVAS_HEIGHT / 2 - HERO_SIZE / 2, size: HERO_SIZE, speed: HERO_SPEED };
    const goblin = { x: randomPosition(CANVAS_WIDTH, GOBLIN_SIZE, PADDING), y: randomPosition(CANVAS_HEIGHT, GOBLIN_SIZE, PADDING), size: GOBLIN_SIZE };

    // Cargar imágenes
    const heroImg = new Image();
    heroImg.src = 'multimedia/images/hero.png';
    const goblinImg = new Image();
    goblinImg.src = 'multimedia/images/monster.png';
    const fondoImg = new Image();
    fondoImg.src='multimedia/images/background.png';
    // Manejador de eventos de teclado
    document.addEventListener('keydown', (e) => {
      e.preventDefault();
      switch (e.key) {
        case 'ArrowUp': hero.y = Math.max(hero.y - hero.speed, PADDING); break;
        case 'ArrowDown': hero.y = Math.min(hero.y + hero.speed, CANVAS_HEIGHT - hero.size - PADDING); break;
        case 'ArrowLeft': hero.x = Math.max(hero.x - hero.speed, PADDING); break;
        case 'ArrowRight': hero.x = Math.min(hero.x + hero.speed, CANVAS_WIDTH - hero.size - PADDING); break;
      }
      if (collision(hero, goblin)) {
        score++;
        goblin.x = randomPosition(CANVAS_WIDTH, GOBLIN_SIZE, PADDING);
        goblin.y = randomPosition(CANVAS_HEIGHT, GOBLIN_SIZE, PADDING);
      }
    });

    // Funciones auxiliares
    function randomPosition(max, size, padding) {
      return Math.random() * (max - size - 2 * padding) + padding;
    }

    function collision(obj1, obj2) {
      return obj1.x < obj2.x + obj2.size &&
             obj1.x + obj1.size > obj2.x &&
             obj1.y < obj2.y + obj2.size &&
             obj1.y + obj1.size > obj2.y;
    }

    function drawCharacter(img, character) {
      ctx.drawImage(img, character.x, character.y, character.size, character.size);
    }

    function drawScore() {
      ctx.font = "20px 'MedievalSharp', sans-serif";
      ctx.fillStyle = "white";
      ctx.fillText("Goblins Caught: " + score, 10, 30);
    }

    function draw() {
      ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT); // Limpiar el canvas
      drawCharacter(heroImg, hero);
      drawCharacter(goblinImg, goblin);
      drawScore();
    }

    function gameLoop() {
      draw();
      requestAnimationFrame(gameLoop);
    }

    // Iniciar el juego
    gameLoop();