/* represents the game being played. It has a constructor that initializes various 
properties including screens, player, game dimensions, obstacles, score, lives, 
and audio objects. */
class Game {
  constructor() {
    this.startScreen = document.getElementById("game-intro");
    this.gameScreen = document.getElementById("game-screen");
    this.gameEndScreen = document.getElementById("game-end");
    this.gameStatsScreen = document.getElementById("game-container");
    this.status = document.getElementById("status");
    this.player = this.player = new Player( //connected to the player file
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
    this.audioArray1 = [new Audio("sounds/no.mp3")];
    this.audio2 = new Audio("sounds/always love you.mp3");
  }
  /* start is a method that sets up the game screen, hides the start screen, 
  and displays the status screen. It also starts the gameLoop(). */

  start() {
    this.gameScreen.style.height = `${this.height}px`;
    this.gameScreen.style.width = `${this.width}px`;

    this.startScreen.style.display = "none";
    this.gameScreen.style.display = "block";
    this.status.style.display = "flex";

    this.gameLoop();
  }

  gameLoop() {
    //a recursive function that runs indefinitely unless the game is over.
    console.log("in the game loop");

    if (this.gameIsOver) {
      //this.audio2.play();
      return;
    }

    this.update();

    window.requestAnimationFrame(() => this.gameLoop()); // to continuously update the game.
  }

  /* update is a method that updates the positions of the player and obstacles, 
  checks for collisions between the player and the obstacles, and updates the 
  score/lives accordingly. It also randomly generates new obstacles and 
  determines the type of obstacle to generate. */

  update() {
    this.player.move();
    console.log("this is score", this.score);
    const j = Math.floor(Math.random() * this.audioArray.length);
    const y = Math.floor(Math.random() * this.audioArray1.length);
    for (let i = 0; i < this.obstacles.length; i++) {
      const obstacle = this.obstacles[i];
      // checking for good obstacles that increase score
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
    // checking for bad obstacles that decrease lives
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

    if (this.lives === 0) {
      this.endGame();
    }
    /* checks the number of good and bad obstacles inside the screen to replace them according
     to the defined number */
    if (
      Math.random() > 0.98 &&
      this.obstacles.length < 10 &&
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

  /* endGame is a method that removes the player and all obstacles from the game screen, 
  displays the end game screen, and sets gameIsOver to true. */

  endGame() {
    this.player.element.remove();
    this.obstacles.forEach((obstacle) => obstacle.element.remove());

    const scoreElement2 = document.getElementById("score2");
    scoreElement2.textContent = this.score;

    this.gameIsOver = true;

    this.gameScreen.style.display = "none";

    this.gameEndScreen.style.display = "block";
  }
}
