class Game {
  constructor() {
    this.startScreen = document.getElementById("game-intro");
    this.gameScreen = document.getElementById("game-screen");
    this.gameEndScreen = document.getElementById("game-end");
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
    this.obstacles = [];
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
      return;
    }

    this.update();

    window.requestAnimationFrame(() => this.gameLoop());
  }

  update() {
    this.player.move();
    console.log("in the update");
    const j = Math.floor(Math.random() * this.audioArray.length);
    for (let i = 0; i < this.obstacles.length; i++) {
      const obstacle = this.obstacles[i];

      obstacle.move();
      if (this.player.didCollide(obstacle)) {
        obstacle.element.remove();
        this.obstacles.splice(i, 1);
        this.audioArray[j].play();
        this.lives++;
        i++;
      } else if (obstacle.top > this.height) {
        this.score++;
        obstacle.element.remove();
        this.obstacles.splice(i, 1);
        i++;
      }
    }

    if (this.lives === 0) {
      this.endGame();
    }

    if (Math.random() > 0.98 && this.obstacles.length < 3) {
      this.obstacles.push(new Obstacle(this.gameScreen));
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
