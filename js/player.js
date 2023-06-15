class Player extends Component {
  /* The constructor method sets up the player's initial properties, such as its position,
   size, and image source. The player's direction properties (directionX and directionY)
    are also initialized to zero.
 */
  constructor(gameScreen, left, top, width, height, imgSrc) {
    super(gameScreen, left, top, width, height, imgSrc);

    this.directionX = 0;
    this.directionY = 0;
  }

  /* a method to updates the position of the player by adding its current direction values to its
   position. If the player moves outside the bounds of the game screen, its position 
   is clamped to the nearest edge.  */

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

  /* didCollide(obstacle) is a method that takes in an Obstacle object as a parameter
   and checks if it collided with the player by comparing the boundary rectangle 
   of the player's element to that of the obstacle's element using the 
   getBoundingClientRect() method. If there is a collision, the method returns 
   true and prints "Crash!" to the console. If there isn't a collision, 
   the method returns false. */

  didCollide(obstacle) {
    const playerRect = this.element.getBoundingClientRect();
    const obstacleRect = obstacle.element.getBoundingClientRect();

    if (
      playerRect.left < obstacleRect.right &&
      playerRect.right > obstacleRect.left &&
      playerRect.top < obstacleRect.bottom &&
      playerRect.bottom > obstacleRect.top
    ) {
      console.log("Crash!");

      return true;
    } else {
      return false;
    }
  }
}
/* This class provides methods to move the player and check if it has collided
 with an obstacle, which is used in the main Game class to update the game's state.
 */
