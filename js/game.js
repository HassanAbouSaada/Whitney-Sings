class Game {
  constructor() {
    this.startScreen = document.getElementById("game-intro");
    this.gameScreen = document.getElementById("game-screen");
    this.gameEndScreen = document.getElementById("game-end");
    this.gameStatsScreen = document.getElementById("game-container");
    this.player = this.player = new Player(
      this.gameScreen,
      200,
      500,
      100,
      150,
      ["./images/whitney.png"]
    );
    this.height = 600;
    this.width = 1000;
    this.obstacles1 = []; // bad obstacles
    this.obstacles = []; // good obstacles
    this.score = 0;
    this.lives = 5;
    this.gameIsOver = false;
    this.audioArray = [
      new Audio("sounds/a4.wav"),
      new Audio("sounds/a4.wav"),
      new Audio("sounds/b4.wav"),
      new Audio("sounds/c4.wav"),
      new Audio("sounds/c5.wav"),
      new Audio("sounds/d4.wav"),
      new Audio("sounds/e4.wav"),
      new Audio("sounds/f4.wav"),
      new Audio("sounds/g4.wav"),
    ];
    this.audioArray1 = [
      new Audio("sounds/no.mp3"),
      new Audio("sounds/wanna run.mp3"),
    ];
    this.audio2 = new Audio("sounds/always love you.mp3");
  }

  start() {
    this.gameScreen.style.height = `${this.height}px`;
    this.gameScreen.style.width = `${this.width}px`;

    this.startScreen.style.display = "none";
    this.gameScreen.style.display = "block";

    this.gameLoop();
  }

  gameLoop() {
    console.log("in the game loop");

    if (this.gameIsOver) {
      this.audio2.play();
      return;
    }

    this.update();

    window.requestAnimationFrame(() => this.gameLoop());
  }

  update() {
    this.player.move();
    console.log("in the update");
    const j = Math.floor(Math.random() * this.audioArray.length);
    const y = Math.floor(Math.random() * this.audioArray1.length);
    for (let i = 0; i < this.obstacles.length; i++) {
      const obstacle = this.obstacles[i];

      obstacle.move();
      if (this.player.didCollide(obstacle)) {
        obstacle.element.remove();
        this.obstacles.splice(i, 1);
        this.audioArray[j].play();
        this.score++;
        i++;
        const scoreElement = document.getElementById("score");
        scoreElement.textContent = this.score;
      } else if (obstacle.top > this.height) {
        obstacle.element.remove();
        this.obstacles.splice(i, 1);
        i++;
      }
    }

    for (let i = 0; i < this.obstacles1.length; i++) {
      const obstacle = this.obstacles1[i];

      obstacle.move();
      if (this.player.didCollide(obstacle)) {
        obstacle.element.remove();
        this.obstacles1.splice(i, 1);
        this.audioArray1[y].play();
        this.lives--;
        const livesElement = document.getElementById("lives");
        livesElement.textContent = this.lives;
      } else if (obstacle.top > this.height) {
        obstacle.element.remove();
        this.obstacles1.splice(i, 1);
        i--;
      }
    }

    /* for (let i = 0; i < this.obstacles1.length; i++) {
      const obstacle = this.obstacles1[i];

      obstacle.move();
      if (this.player.didCollide(obstacle)) {
        obstacle.element.remove();
        this.obstacles1.splice(i, 1);
        this.audioArray[j].play();
        this.lives--;
        i--;
      } else if (obstacle.top > this.height) {
        obstacle.element.remove();
        this.obstacles1.splice(i, 1);
        i++;
      }
    } */

    if (this.lives === 0) {
      this.endGame();
    }

    if (
      Math.random() > 0.98 &&
      this.obstacles.length < 7 &&
      this.obstacles1.length < 4
    ) {
      const obstacleType = Math.random() < 0.5 ? Obstacle : Obstacle1;
      if (obstacleType === Obstacle) {
        this.obstacles.push(new Obstacle(this.gameScreen));
      } else {
        this.obstacles1.push(new Obstacle1(this.gameScreen));
      }
    }
  }
  endGame() {
    this.player.element.remove();
    this.obstacles.forEach((obstacle) => obstacle.element.remove());

    this.gameIsOver = true;

    this.gameScreen.style.display = "none";

    this.gameEndScreen.style.display = "block";
  }
}
