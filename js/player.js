class Player extends Component {
  constructor(gameScreen, left, top, width, height, imgSrc) {
    super(gameScreen, left, top, width, height, imgSrc);

    this.directionX = 0;
    this.directionY = 0;
  }

  move() {
    this.left += this.directionX;
    this.top += this.directionY;

    if (this.left < 10) {
      this.left = 10;
    }
    if (this.top < 10) {
      this.top = 10;
    }
    if (this.left > this.gameScreen.offsetWidth - this.width - 10) {
      this.left = this.gameScreen.offsetWidth - this.width - 10;
    }
    if (this.top > this.gameScreen.offsetHeight - this.height - 10) {
      this.top = this.gameScreen.offsetHeight - this.height - 10;
    }

    this.updatePosition();
  }

  didCollide(obstacle) {
    const audioArray = [
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
    const i = Math.floor(Math.random() * audioArray.length);

    const playerRect = this.element.getBoundingClientRect();
    const obstacleRect = obstacle.element.getBoundingClientRect();

    if (
      playerRect.left < obstacleRect.right &&
      playerRect.right > obstacleRect.left &&
      playerRect.top < obstacleRect.bottom &&
      playerRect.bottom > obstacleRect.top
    ) {
      console.log("Crash!");
      audioArray[i].play();
      return true;
    } else {
      return false;
    }
  }
}
