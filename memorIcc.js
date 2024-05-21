
const config = {
    type: Phaser.AUTO,
    width: 1280,
    height: 720,
    cols: 4,
    rows: 4,
    cards: [1, 2, 3, 4, 5, 6, 7 ,8],
    timeInSeconds: 1,
    scene: new gameLogic(),
  };
  
  const game = new Phaser.Game(config);
  