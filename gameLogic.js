class gameLogic extends Phaser.Scene {
    constructor() {
      super("logic");
    }
  
    preload() {
      //console.log("preloading gameSprites...");
      this.load.image("bg", "Images/BackGround/bg.png");
      this.load.image("card", "Images/cards/back.png");
      this.load.image("container1", "Images/containers/container1.png");
      this.load.image("container2", "Images/containers/container1.png");
      this.load.image("resetButton", "Images/buttons/resetButton.png");
      this.load.image("quitButton", "Images/buttons/quitButton.png");
      this.load.image("header", "Images/head/header.png");
      this.load.image("sparkles1", "Images/visualThings/sparkles1.png");
      this.load.image("sparkles2", "Images/visualThings/sparkles1.png");
      //console.log("gameSprites preloaded");
      for (let cardNumber of config.cards) {
        this.load.image(
          `card${cardNumber}`,
          `Images/cards/0${cardNumber}.png`
        );
      }
      //console.log("gameSprites preloaded");
    }
    
    create() {
      //console.log("creating game...");
      this.timeInSeconds = config.timeInSeconds;
      this.timeInMinutes = 0;
      this.finalScore = 0;
      this.createTimer(); 
      this.createBackground();
      this.loadContainer1();
      this.loadContainer2();
      this.loadResetButton(); 
      this.loadHeader();
      this.createText();
      this.createCards();
      this.start();
      
    }
    loadHeader(){
      let graphics = this.add.graphics();
      graphics.fillStyle(0x000000, 0.5);
      graphics.fillRect(0, 0, this.sys.game.config.width, 50);
      //console.log("loading header...");
      let header = this.add.sprite((this.sys.game.config.width * 0.4), (this.sys.game.config.height * 0.01), "header").setOrigin(0, 0);
      let scaleX = (this.cameras.main.width / header.width) * 0.25;
      let scaleY = (50 / header.height) * 0.25;
      let scale = Math.max(scaleX, scaleY);
      header.setScale(scale).setScrollFactor(0);
      //console.log("banner loaded");
      let quitBttn = this.add.sprite((this.sys.game.config.width * 0.961), (this.sys.game.config.height * 0), "quitButton").setOrigin(0, 0).setInteractive();
      let scaleIndex = 0.039;
      let scalebttX = (this.cameras.main.width / quitBttn.width) * scaleIndex;
      let scalebttY = (50 / quitBttn.height) * scaleIndex;
      let scalebtt = Math.max(scalebttX, scalebttY);
      quitBttn.setScale(scalebtt).setScrollFactor(0);
      //console.log("quit button loaded");
      quitBttn.on("pointerdown", () =>{
        console.log("quit button clicked");
        if(window.confirm("¿Estás seguro de que deseas salir?")){
          //console.log("quitting game...");
          window.location.href = "mainPage.html";
        }
      });
    }
    loadResetButton() {
        //console.log("loading reset button...");
        let resetButton = this.add.sprite((this.sys.game.config.width * 0.65), (this.sys.game.config.height * 0.6), "resetButton").setOrigin(0, 0).setInteractive();
        //console.log("reset button loaded");
        let scaleIndex = 0.2;
        let scaleX = (this.cameras.main.width / resetButton.width) * scaleIndex;
        let scaleY = (this.cameras.main.height / resetButton.height) * scaleIndex;
        let scale = Math.max(scaleX, scaleY);
        //console.log("scaling reset button...");
        resetButton.setScale(scale).setScrollFactor(0);
        resetButton.on("pointerdown", () =>{
            console.log("reset button clicked");
            //this.loadResetFunction();
            window.location.reload();
            
        });
        //console.log("reset button scaled");
    }
    loadResetFunction() {
      this.restart();
    }
    loadContainer2() {
        //console.log("loading container2...");
        let container = this.add.sprite((this.sys.game.config.width * 0.63), (this.sys.game.config.height * 0.25), "container2").setOrigin(0, 0);
        //console.log("container2 loaded");
        let scaleIndex = 0.25;
        let scaleX = (this.cameras.main.width / container.width) * scaleIndex;
        let scaleY = (this.cameras.main.height / container.height) * scaleIndex;
        let scale = Math.max(scaleX, scaleY);
        //console.log("scaling container2...");
        container.setScale(scale).setScrollFactor(0);
        //console.log("container2 scaled");
    }
    loadContainer1() {
        //console.log("loading container...");
        let container = this.add.sprite((this.sys.game.config.width * 0.63), -(this.sys.game.config.height * 0), "container1").setOrigin(0, 0);
        //console.log("container loaded");
        let scaleIndex = 0.25;
        let scaleX = (this.cameras.main.width / container.width) * scaleIndex;
        let scaleY = (this.cameras.main.height / container.height) * scaleIndex;
        let scale = Math.max(scaleX, scaleY);
        //console.log("scaling container...");
        container.setScale(scale).setScrollFactor(0);
        let sparkles1 = this.add.sprite((this.sys.game.config.width * 0.61), (this.sys.game.config.height * 0.09), "sparkles1").setOrigin(0, 0);
        let sparkles2 = this.add.sprite((this.sys.game.config.width * 0.81), (this.sys.game.config.height * 0.2), "sparkles2").setOrigin(0, 0);
        let scaleSparkles = 0.08;
        let scaleXSparkles = (this.cameras.main.width / sparkles1.width) * scaleSparkles;
        let scaleYSparkles = (this.cameras.main.height / sparkles1.height) * scaleSparkles;
        scaleSparkles = Math.max(scaleXSparkles, scaleYSparkles);
        sparkles1.setScale(scaleSparkles).setScrollFactor(0);
        scaleSparkles = 0.08;
        scaleXSparkles = (this.cameras.main.width / sparkles2.width) * scaleSparkles;
        scaleYSparkles = (this.cameras.main.height / sparkles2.height) * scaleSparkles;
        scaleSparkles = Math.max(scaleXSparkles, scaleYSparkles);
        sparkles2.setScale(scaleSparkles).setScrollFactor(0);
        //console.log("container scaled");
    }
    start() {
      //console.log("starting game...");
      this.initCardPositions();
      this.timeInSeconds = config.timeInSeconds;
      this.timeInMinutes = 0;
      this.openCard = null;
      this.openCardsCount = 0;
      this.timer.paused = false;
      this.initCards();
      this.showCards();
    }
  
    restart() {
      //unused function, have to change it, the cards must be erased and the game must start again
      let count = 0;
      let onCardMoveComplete = () => {
        ++count;
        if (count >= this.cards.length) {
          this.start();
        }
      };
      this.cards.forEach((card) => {
        card.move({
          x: this.sys.game.config.width + card.width,
          y: this.sys.game.config.height + card.height,
          delay: card.position.delay,
          callback: onCardMoveComplete,
        });
      });
    }
    createTimer() {
      //console.log("creating timer...");
      this.timer = this.time.addEvent({
        delay: 1000,
        callback: this.onTimerTick,
        callbackScope: this,
        loop: true,
      });
    }
    createText() {
      this.timeOutTextSeconds = this.add.text((this.sys.game.config.width * 0.757), (this.sys.game.config.height * 0.44), "", {
        font: "50px PressStart2p",
        fill: "#240b4a",
      });
      this.timeOutTextMinutes = this.add.text((this.sys.game.config.width * 0.69), (this.sys.game.config.height * 0.44), "", {
        font: "50px PressStart2p",
        fill: "#240b4a",
      });
      this.scoreText = this.add.text((this.sys.game.config.width * 0.7), (this.sys.game.config.height * 0.19), "", {
        font: "50px PressStart2p",
        fill: "#240b4a",
      });
      this.scoreText.setText(`00${this.finalScore}`);
      //console.log("text created");
    }
    createBackground() {
        //console.log("creating background...");
        let bg = this.add.sprite(0, 0, "bg").setOrigin(0, 0);
        //console.log("background created");
        let scaleX = this.cameras.main.width / bg.width;
        let scaleY = this.cameras.main.height / bg.height;
        let scale = Math.max(scaleX, scaleY);
        //console.log("scaling background...");
        bg.setScale(scale).setScrollFactor(0);
        //console.log("background scaled");
    }
  
    createCards() {
      this.cards = [];
        //console.log("creating cards...");
      for (let value of config.cards) {
        for (let i = 0; i < 2; i++) {
          this.cards.push(new Card(this, value));
        }
      }
        //console.log("cards created");
      this.input.on("gameobjectdown", this.onCardClicked, this);
    }
  
    initCards() {
      //console.log("randomizing cards...");
      const positions = Phaser.Utils.Array.Shuffle(this.positions);
      //console.log("cards randomized");
      this.cards.forEach((card) => {
        card.init(positions.pop());
      });
    }
  
    showCards() {
      this.cards.forEach((card) => {
        card.depth = card.position.delay;
        //console.log("showing cards...");
        card.move({
          x: card.position.x,
          y: card.position.y,
          delay: card.position.delay,
        });
        //console.log("cards shown");
      });
    }
  
    onCardClicked(_, card) {
      if (card.opened) return false;
      const { openCard } = this;
      if (openCard) {
        //console.log("opening card...");
        if (openCard.value === card.value) {
          //console.log("cards matched");
          this.openCard = null;
          ++this.openCardsCount;
          //console.log("updating card count...");
          //console.log("cards count: " + this.openCardsCount);
          //console.log("updating score...");
          this.finalScore += Math.round(500/((this.timeInMinutes * 60)+this.timeInSeconds));
          this.scoreText.setText(`${this.finalScore}`);
          //console.log("score: " + this.finalScore);
        } else {
            //console.log("cards not matched");
          this.openCard.close();
          this.openCard = card;
        }
      } else {
        //console.log("opening card...");
        this.openCard = card;
        //console.log("card opened");
      }
  
      card.open(() => {
        if (this.openCardsCount === config.cards.length) {
          //this.restart();
          //console.log("winning message");
          window.alert("¡Felicidades! Has ganado, tu puntuación es: " + this.finalScore + " puntos.");
          window.location.href = "mainPage.html";
        }
      });
    }
  
    initCardPositions() {
      let positions = [];
      let cardTexture = this.textures.get("card").getSourceImage(); 
      //console.log(defining card positions...);
      let id = 0; 
      for (let row = 0; row < config.rows; row++) {
        for (let col = 0; col < config.cols; col++) {
          ++id;
          positions.push({
            delay: id * 100,
            x: (this.sys.game.config.width * 0.11) + (col * 150),
            y: (this.sys.game.config.height * 0.19) + (row *150),
          });
        }
      }
        //console.log("card positions defined");
      this.positions = positions;
    }
    onTimerTick() {
      //console.log("updating seconds...");
      this.timeOutTextSeconds.setText(`${this.timeInSeconds}`);
      //console.log("seconds updated");
      //console.log("updating minutes...");
      this.timeOutTextMinutes.setText(`${this.timeInMinutes}:`);
      //console.log("minutes updated");
      
      if (this.timeInSeconds > 60) {
        this.timeInSeconds = 0;
        ++this.timeInMinutes;
      } else {
        ++this.timeInSeconds;
      }
      //console.log("time updated");
    }
  }
  