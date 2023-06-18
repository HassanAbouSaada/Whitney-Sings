class Obstacle extends Component {
  constructor(gameScreen, audioId) {
    const imageFiles = [
      { fileName: "./images/a4.png", audioId: 0 },
      { fileName: "./images/b4.png", audioId: 1 },
      { fileName: "./images/c4.png", audioId: 2 },
      { fileName: "./images/c5.png", audioId: 3 },
      { fileName: "./images/d4.png", audioId: 4 },
      { fileName: "./images/e4.png", audioId: 5 },
      { fileName: "./images/f4.png", audioId: 6 },
      { fileName: "./images/g4.png", audioId: 7 },
    ];

    const selectedFile =
      imageFiles[Math.floor(Math.random() * imageFiles.length)];
    super(gameScreen, Math.floor(Math.random() * -1000 + 1000), 0, 60, 60, [
      selectedFile.fileName,
    ]);
    this.audioId = selectedFile.audioId;
  }

  move() {
    this.top += 3;
    this.updatePosition();
  }
}
