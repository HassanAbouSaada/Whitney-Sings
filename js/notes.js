class Obstacle extends Component {
  constructor(gameScreen) {
    super(
      gameScreen,
      Math.floor(Math.random() * -1000 + 1000),
      0,
      60,
      60,
      "./images/note.png"
    );
  }

  move() {
    this.top += 2;

    this.updatePosition();
  }
}
