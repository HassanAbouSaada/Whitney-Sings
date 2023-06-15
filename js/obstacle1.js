class Obstacle1 extends Component {
  constructor(gameScreen) {
    super(gameScreen, Math.floor(Math.random() * -1000 + 1000), 0, 60, 60, [
      "./images/paparazzi.png",
      "./images/paparazzi1.png",
    ]);
  }

  move() {
    this.top += 3;

    this.updatePosition();
  }
}
