class Obstacle extends Component {
  constructor(gameScreen) {
    super(gameScreen, Math.floor(Math.random() * -1000 + 1000), 0, 60, 60, [
      "./images/paparazzi.png",
      "./images/note.png",
      "./images/a4.png",
      "./images/b4.png",
      "./images/c4.png",
      "./images/c5.png",
      "./images/d4.png",
      "./images/e4.png",
      "./images/f4.png",
      "./images/g4.png",
    ]);

    /*     super(
      gameScreen,
      Math.floor(Math.random() * -900 + 900),
      0,
      60,
      60,
      "./images/note.png"
    ); */
  }

  move() {
    this.top += 3;
    this.updatePosition();
  }
}
