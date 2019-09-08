import Player from "../models/player";
import Boss from "../models/boss";
import Bola from "../models/bola";


export default class FirstScene extends Phaser.Scene {
  constructor(key) {
    super(key);
  }


  preload(){

    this.load.image("background", "assets/background.jpg");

    this.load.image("player", "assets/player.png");
    this.load.image("boss", "assets/boss.png");

    this.load.spritesheet("bola", "assets/bola.png", {
        frameWidth: 64,
        frameHeight: 64
      });

      this.load.audio('tiro', 'assets/sound/tiro.wav');
    this.load.audio('dano','assets/sound/levar_dano.ogg');
  }

  create(){

    this.tiro = this.sound.add('tiro');
    this.levar_dano = this.sound.add('dano');

     //background
     this.add.image(375, 250, 'background');
    
     this.vida = 100;
    this.qtVida = this.add.text(15,15,"VIDA: " + this.vida , {font: '15px emulogic' , fill: '#fff'});
    

     //player
     this.player = new Player(this, 375, 450).setSize(40,60).setOffset(20, 30);

     //boss
     this.boss = new Boss(this,375,50);

     //criar bola
     this.bola  = new Bola(this.physics.world, this, this.player);

      //input
    this.cursors = this.input.keyboard.createCursorKeys();
    this.spaceBar = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );

    //colisao
    this.player.setCollideWorldBounds(true);
    
    this.physics.add.overlap(
      this.player.bullets,
      this.boss,
      this.darHit,
      null,
      this
    );
    this.physics.add.overlap(
      this.player,
      this.bola,
      this.gameOver,
      null,
      this
    );

    this.anims.create({
        key: "explusao",
        frames: this.anims.generateFrameNumbers("bola", { start: 0, end: 23 }),
        frameRate: 10,
        repeat: 0
      });
      
      this.addEvents();


  }

  update(time) {
    this.player.update(this.cursors);
    if (Phaser.Input.Keyboard.JustDown(this.spaceBar)) {
      //tempo do jogo será passado para o objeto nave
      this.player.fire(time);
    }

  }


  gameOver(){
   
    this.scene.stop();
    this.scene.start('GameOver');
    
  }

  gameOverWin(){
  
    this.scene.stop();
    this.scene.start('GameOverWin');
  }

  addEvents(){
    this.timer = this.time.addEvent({
      delay: 3000,
      callback: this.bola.addNovaBola,
      callbackScope: this,
      repeat: -1
    });
  }

  darHit(){
    console.log(this.boss.vida);
    this.vida = this.boss.vida/1000;
    this.qtVida.text = "VIDA: " + parseInt(this.vida); 
    this.boss.vida -= 100;
    if(this.boss.vida < 0){
      this.gameOverWin();
    }
  }



}