/* a function that will be executed when the HTML file/window is fully loaded, 
indicated by the window.onload event. The function defines a few variables 
such as an audio object that will play some music when the game starts, 
and two buttons (start and restart).*/

window.onload = function () {
  //
  const audio = new Audio("sounds/dance with somebody.mp3");
  const startButton = document.getElementById("start-button");
  const restartButton = document.getElementById("restart-button");
  let game;

  startButton.addEventListener("click", function () {
    startGame();
  });

  // initiates the game by calling its start() method.
  function startGame() {
    console.log("start game");
    game = new Game();
    game.start();
    audio.play();
  }

  /*  The user can control the game's player character using their keyboard's arrow keys,
   which is handled through the handleKeydown(event) function and its event listener. */

  function handleKeydown(event) {
    // a function called each time a user presses a key.
    const key = event.key; // takes in an event object as a parameter, which is generated whenever any key is pressed
    const possibleKeystrokes = [
      "ArrowLeft",
      "ArrowUp",
      "ArrowRight",
      "ArrowDown",
    ];

    if (possibleKeystrokes.includes(key)) {
      //checks if it is one of the four arrow keys
      event.preventDefault(); //prevents the default action associated with the key

      /* instead changes the direction of the game's player character by changing
       the player's directionX or directionY properties appropriately. */

      switch (key) {
        case "ArrowLeft":
          game.player.directionX = -2;
          break;
        case "ArrowUp":
          game.player.directionY = -2;
          break;
        case "ArrowRight":
          game.player.directionX = 2;
          break;
        case "ArrowDown":
          game.player.directionY = 2;
          break;
      }
    }
  }
  /*  event listener to the window object, waiting for the keydown event to be triggered 
  so that the handleKeydown function can be called when the user presses a key.
  */

  window.addEventListener("keydown", handleKeydown);

  restartButton.addEventListener("click", function () {
    restartGame();
  });

  function restartGame() {
    //restart the game from the beginning.
    location.reload();
  }
};
