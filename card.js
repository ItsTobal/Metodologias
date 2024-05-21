class Card extends Phaser.GameObjects.Sprite {
    constructor(scene, value) {
      super(scene, 0, 0, "card");
      //console.log("Card constructor");
      this.scene = scene;
      this.value = value;
      //console.log("Card value: ", this.value);
      let gameWidth = this.scene.sys.game.config.width;
      let gameHeight = this.scene.sys.game.config.height;
      let scaleX = (gameWidth / this.width) * 0.2;
      let scaleY = (gameHeight / this.height) * 0.2;
      let scale = Math.min(scaleX, scaleY);
      this.setScale(scale);
      //console.log("Card scale: ", scale);
      this.scene.add.existing(this);
      this.setInteractive();
      this.opened = false;
    }
  
    init(position) {
      this.position = position;
      this.close();
      this.setPosition(-this.width, -this.height);
    }
  
    move(params) {
      this.scene.tweens.add({
        targets: this,
        x: params.x,
        y: params.y,
        delay: params.delay,
        easy: "Linear",
        duration: 150,
        onComplete: () => {
          if (params.callback) {
            params.callback();
          }
        },
      });
    }
  
    flip(callback) {
      this.scene.tweens.add({
        targets: this,
        scaleX: 0,
        easy: "Linear",
        duration: 150,
        onComplete: () => this.show(callback),
      });
    }
  
    show(callback) {
      let texture = this.opened ? `card${this.value}` : "card";
      this.setTexture(texture);
  
      this.scene.tweens.add({
        targets: this,
        scaleX: 0.14,
        easy: "Linear",
        duration: 150,
        onComplete: () => {
          if (callback) {
            callback();
          }
        },
      });
    }
  
    open(callback) {
      this.opened = true;
      this.flip(callback);
    }
  
    close() {
      if (this.opened) {
        this.opened = false;
        this.flip();
      }
    }
  }
  